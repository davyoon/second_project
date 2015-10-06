$(document).ready(function(){
	
	var pictures = ["https://gaytravel-destinations.s3.amazonaws.com/31874/riviera_maya_beauty__large.jpg", "https://cdn.kiwicollection.com/media/property/PR000063/xl/000063-09-night-pool.jpg", "http://images.stsvacations.com/inventory/Mexico_-_Riviera_Maya/Hard_Rock_Hotel_Riviera_Maya/medium_Hard_Rock_Hotel_Riviera_Maya_f02b981c7659e358ac6deea6f241c966.jpg", "http://www.weizmann.ac.il/alumni/English//alumni/English/uploads/image/New-York.jpg", "http://amilcook.com/img/2014/6/4_16_pan-pacific-nirwana-bali-resort.jpg", "http://cdn.homesthetics.net/wp-content/uploads/2013/12/Exquisite-Exotic-Resort-Alila-Villas-Soori-in-Bali-by-SCDA-Architects-Homesthetics-12.jpg", "http://elgrandepics.com/wp-content/uploads/2013/03/Cherry-Blossom-Lake-Sakura-Japan.jpg", "http://joelsantos.net/wp-content/uploads/2013/07/joel-santos-iceland-06.jpg", "https://dirigobound.files.wordpress.com/2015/02/aurora-borealis-or-northern-lights-iceland-3.jpg"]
	// var $picture = '';
	setInterval(function(){
		var number = Math.floor(Math.random() * pictures.length);
		var $picture = $("<img src=" + "'" + pictures[number] + "'" + " class='images pure-img'>");
		$(".frame").append($picture).hide().fadeIn(500);
		setTimeout(function(){
			$picture.fadeOut(1000);
		},2000);
	},3000);

});