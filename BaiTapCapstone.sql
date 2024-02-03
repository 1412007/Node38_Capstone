-- Create database 
create database capstone;

-- Create table 
use capstone;
create table nguoi_dung (
	nguoi_dung_id int AUTO_INCREMENT,
    email varchar(255),
    mat_khau varchar(255),
    ho_ten varchar(255),
    tuoi int,
    anh_dai_dien varchar (255),
    PRIMARY KEY (nguoi_dung_id)
);

create table hinh_anh (
	hinh_id int AUTO_INCREMENT,
    ten_hinh varchar (255),
    duong_dan varchar (255),
    mo_ta varchar (255),
    nguoi_dung_id int,
    PRIMARY KEY (hinh_id),
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id)
);

create table binh_luan (
	binh_luan_id int AUTO_INCREMENT,
    nguoi_dung_id int,
    hinh_id int,
    ngay_binh_luan date,
    noi_dung varchar (255),
    PRIMARY KEY (binh_luan_id),
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id),
    FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id)
);

create table luu_anh (
	nguoi_dung_id int,
    hinh_id int,
    ngay_luu date,
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id),
    FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id)
);