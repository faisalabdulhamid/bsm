<?php

namespace bsm\Model;

use Illuminate\Database\Eloquent\Model;

use bsm\Model\Transaksi;

class JenisTransaksi extends Model
{
    protected $table = 'jenis_transaksi';
    public $timestamps = false;

    public function transaksis()
    {
    	return $this->hasMany(Transaksi::class, 'jenis_transaksi_id');
    }
}
