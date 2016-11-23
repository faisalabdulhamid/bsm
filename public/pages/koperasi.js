var form = '' +
    '<form class="form-horizontal">'+
    '<div class="modal-body">'+
    //form-group
    '<div class="form-group">'+
    '<label class="col-sm-3 control-label">Nama</label>'+
    '<div class="col-sm-9">' +
    '<input type="text" name="nama" class="form-control">'+
    '</div>'+
    '</div>'+
    //form-group
    '<div class="form-group">'+
    '<label class="col-sm-3 control-label">api token</label>'+
    '<div class="col-sm-9">' +
    '<input type="text" name="token" class="form-control">'+
    '</div>'+
    '</div>'+
    //end-form-group
    //form-group
    '<div class="form-group">'+
    '<label class="col-sm-3 control-label">key</label>'+
    '<div class="col-sm-9">' +
    '<input type="text" name="key" class="form-control">'+
    '</div>'+
    '</div>'+
    //end-form-group
    //end-form-group
    '<div class="modal-footer">'+
    '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
    '<button type="button" class="btn btn-default" id="btnSimpan">Simpan</button>'+
    '</div>'+
    '</form>';
var formhapus = '' +
    '<form class="form-horizontal">'+
    '<div class="modal-footer">'+
    '<button type="button" class="btn btn-default" data-dismiss="modal">Tidak</button>'+
    '<button type="button" class="btn btn-default" id="btnSimpan">Ya</button>'+
    '</div>'+
    '</form>';
var table = $("#table").DataTable({
	//"processing"  : true,
    //"serverSide"  : true,
    "paging"      : true,
    "lengthChange": false,
    "searching"   : true,
    "ordering"    : false,
    "info"        : false,
    "autoWidth"   : false,
    "select"      : {
        style: 'single'
    },
    "ajax"        : {
        "context" : {
            "context" : "table"
        },
        "url"     : "/koperasi/data-koperasi",
        "dataSrc" : "data"
    },
    "columns"     : [
        {"data": "id"},
        {"data": "nama"},
        {"data": "date_open"},
        {"data": "date_close"},
        {"data": "action"}
    ]
});

$(function(){
	$("table#table tbody").on('click', 'tr td button#btn-ubah', function(event){
        event.preventDefault();
        var id = $(this).data('id');
        var nama = $(this).data('nama');
        var token = $(this).data('token');
        var key = $(this).data('key');

        $('body').append(modal);
        if($('form').length == 0) {
            $('.modal-content').append(form);
        }

        //tambah input-hidden name id
        $("#modal").find("form.form-horizontal input[name=nama]").after(function(){
            if($('input[name="id"]').length == 0)
                return '<input type="hidden" name="id">';
        });
        //tambah help-block di api
        $("form.form-horizontal").find("input[name=token]").after(function(){
            if($('span.token').length == 0)
                return '<span class="help-block token">Kosongkan apabila tidak diganti</span>';
        });
        //tambah help-block di api
        $("form.form-horizontal").find("input[name=key]").after(function(){
            if($('span.key').length == 0)
                return '<span class="help-block key">Kosongkan apabila tidak diganti</span>';
        });

        $('.modal-title').text("Ubah Pegawai");
        $('#modal').modal({keyboard: false, backdrop: 'static'});

        $("input[name=id]").val(id);
        $("input[name=nama]").val(nama);

        //AJAX
        $(".modal").on("click", "#btnSimpan", function(event){
            var xhr = $.ajax({
                context : {
                    "event"   : event,
                    "context" : 'form'
                },
                async   : false,
                global  : true,
                // cache   : false,
                type    : 'POST',
                url     : window.location+"/ubah",
                dataType: 'json',
                data: {
                    'id'    : $("input[name=id]").val(),
                    'nama'  : $("input[name=nama]").val(),
                    'token' : $("input[name=token]").val(),
                    'key'   : $("input[name=key]").val()
                }
            }).done(function(){
                table.ajax.reload();
            });
        });

        $("#modal").on('hidden.bs.modal', function(e){
            $(this).remove();
        });
        
    });

    $("table#table tbody").on('click', 'tr td button#btn-hapus', function(event){
        event.preventDefault();
        var id = $(this).data('id');

        $('body').append(modal);
        if($('form').length == 0) {
            $('.modal-content').append(formhapus);
        }

        $("#modal").find("form.form-horizontal .modal-footer").after(function(){
            if($('input[name="id"]').length == 0)
                return '<input type="hidden" name="id">';
        });

        $('.modal-title').text("Apakah yakin Akan dihapus ?");
        $('.modal-dialog').addClass('modal-sm');
        $('#modal').modal({keyboard: false, backdrop: 'static'});

        $("input[name=id]").val(id);
        //AJAX
        $(".modal").on("click", "#btnSimpan", function(event){
            $.ajax({
                context : {
                    "event"   : event,
                    "context" : 'form'
                },
                async   : false,
                global  : true,
                // cache   : false,
                type    : 'POST',
                url     : window.location+"/hapus",
                dataType: 'json',
                data: {
                    'id'       : $("input[name=id]").val(),
                }
            }).done(function(){
                table.ajax.reload();
            });
        });

        $("#modal").on('hidden.bs.modal', function(e){
            $(this).remove();
        });
        
    });

	$('#tambah').on('click', function(){
 		$('body').append(modal);
 		if($('form').length == 0) {
	        $('.modal-content').append(form);
	    }
 		$('.modal-title').text("Tambah Koperasi");
 		$('#modal').modal({keyboard: false, backdrop: 'static'});

 		//AJAX
 		$(".modal").on("click", "#btnSimpan", function(event){
 			$.ajax({
                context : {
                    "event"   : event,
                    "context" : 'form'
                },
 				type    : 'POST',
	            url     : window.location+"/tambah",
	            dataType: 'json',
                async   : false,
	            data: {
					'nama'    : $("input[name=nama]").val(),
					'token'   : $("input[name=token]").val(),
					'key'     : $("input[name=key]").val(),	                
	            }
 			});
 		});

 		$("#modal").on('hidden.bs.modal', function(e){
            $('.modal').remove();
        });
 	});

 	//define button
 	$('#ubah').attr("disabled", 'disabled')
    $('#hapus').attr("disabled", 'disabled')
    $('#tambah').removeAttr("disabled")
});