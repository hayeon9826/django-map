// 우리집 지도
var mapOption1 = {
    center: new naver.maps.LatLng(37.5672602, 126.93243959999995),
    zoom: 12
};

var map1 = new naver.maps.Map('map', mapOption1);

//현 위치 지도
var map2 = new naver.maps.Map('map2', { //home.html에서 map2 라고 지정
    center: new naver.maps.LatLng(37.5672602, 126.93243959999995), //디폴트 우리집
    zoom: 5,
    mapTypeId: naver.maps.MapTypeId.NORMAL
});

var infowindow = new naver.maps.InfoWindow();

function onSuccessGeolocation(position) {
    var location = new naver.maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);

    map2.setCenter(location); // 얻은 좌표를 지도의 중심으로 설정합니다.
    map2.setZoom(12); // 지도의 줌 레벨을 변경합니다.

    // infowindow.setContent('<div style="padding:20px;">' + 'geolocation.getCurrentPosition() 위치' + '</div>'); 실행 안됨 다시
    infowindow.setContent('<div style="padding:20px;">' + '현재위치' + '</div>'); //infowindow 내용 설정

    infowindow.open(map2, location);
    console.log('Coordinates: ' + location.toString());
}

function onErrorGeolocation() {
    var center = map2.getCenter();

    infowindow.setContent('<div style="padding:20px;">' +
        '<h5 style="margin-bottom:5px;color:#f00;">Geolocation failed!</h5>'+ "latitude: "+ center.lat() +"<br />longitude: "+ center.lng() +'</div>');

    infowindow.open(map2, center);
}

$(window).on("load", function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation);
    } else {
        var center = map2.getCenter();
        infowindow.setContent('<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation not supported</h5></div>');
        infowindow.open(map2, center);
    }
});