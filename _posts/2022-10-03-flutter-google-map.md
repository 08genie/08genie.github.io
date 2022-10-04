---
title: "[Flutter] 플러터(Flutter) 구글맵(GoogleMap) 사용하기"
author: genie
date: 2022-10-03 15:17:10 +0900
categories: [Framework, Flutter]
tags: [flutter, 플러터, 구글맵, google, googleMap, map, How to, Study]
---

## 구글맵(Google) 세팅하기
---
**Notice** : IDE(개발환경)은 안드로이드스튜디오(Android Studio)를 사용합니다.
<br>

1. 구글맵을 세팅하기 위해 pub.dev 에서 [**google_maps_flutter**](https://pub.dev/packages/google_maps_flutter)와 [**geolocator**](https://pub.dev/packages/geolocator) 페이지를 각각 열어 줍니다. 먼저 ``google_maps_flutter`` 페이지에서 스크롤을 내려 ``Getting Started``에서 아래와 같이 https://cloud.google.com/maps-platform 을 클릭합니다.
<br>

    >  pub.dev란 ReactNative와 Flutter의 방대한 오픈소스 패키지 입니다.  
    {: .prompt-info }
![Desktop View](/assets/img/2022-10-03/1.png){: width="100%" }
<br>
<br>
<br>

2. 오른쪽 상단에  ``Get started`` 버튼을 클릭합니다.
![Desktop View](/assets/img/2022-10-03/2.png){: width="100%" }
<br>
<br>
<br>

3. 결제 정보를 등록해주시고 왼쪽 ``API`` 탭을 클릭 클릭합니다. 사용 설정된 API에  ``Maps SDK for Android``와 ``Maps SDK for iOS``가 있는 것을 확인합니다. 없다면 아래 추가 API에서 설정을 해주어야 합니다.
<br>

    >  단순하게 특정 위치의 지도만 표시하는 경우에는 과금이 되지 않습니다. 과금이 되는 대상은 경로를 검색하거나(Directions mode) 스트리트뷰를 사용하거나(Street View mode) 검색기능을 사용(Search mode)할 때 과금 됩니다. 
    {: .prompt-tip }
![Desktop View](/assets/img/2022-10-03/3.png){: width="100%" }    
<br>
<br>
<br>

4. 왼쪽 ``사용자 인증정보``탭을 클릭하면 ``Maps API Key``가 발급된 것을 볼 수 있습니다. 키표시 버튼을 클릭하여 API키를 복사합니다. (API키가 발급 되지 않았다면 상단의 ``+ 사용자 인증 정보 만들기``를 클릭하여 API키를 발급해주세요.)
![Desktop View](/assets/img/2022-10-03/4.png){: width="100%" }
<br>
<br>
<br>

5. 앱은 Android SDK 20 이상을 실행하는 사용자만 사용할 수 있습니다. android > app > build.gradle 파일을 열어 아래와 같이 SDK 최소 버전을 20 으로 변경합니다.
![Desktop View](/assets/img/2022-10-03/5.png){: width="100%" }
<br>
<br>
<br>

6. API 키 지정을 위해 android > app > src > main > AndroidManifest.xml 파일을 열어 아래 코드를 붙여 넣고 android:value에 복사했던 API키를 붙여넣기합니다.

    ```config
    <meta-data android:name="com.google.android.geo.API_KEY" android:value="YOUR KEY HERE"/>  
    ```
    {: file='/android/app/src/main/AndroidManifest.xml'}
![Desktop View](/assets/img/2022-10-03/6.png){: width="100%" }
<br>
<br>
<br>

7. 애플리케이션 대리자에게 API 키를 지정하기 위해 ios > Runner > AppDelegate.swift 파일을 열어 기존 코드를 모두 지운 후 아래 코드를 붙여 넣고 CMSServices.provideAPIKey에 복사했던 API키를 붙여넣기 합니다.
    ```config
    import UIKit
    import Flutter
    import GoogleMaps

    @UIApplicationMain
    @objc class AppDelegate: FlutterAppDelegate {
      override func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
      ) -> Bool {
        GMSServices.provideAPIKey("YOUR KEY HERE")
        GeneratedPluginRegistrant.register(with: self)
        return super.application(application, didFinishLaunchingWithOptions: launchOptions)
      }
    }
    ```
    {: file='/ios/Runner/AppDelegate.swift'}
![Desktop View](/assets/img/2022-10-03/7.png){: width="100%" }
<br>
<br>
<br>

8. ``google_maps_flutter`` 페이지로 돌아와 아래와 같이 버튼을 클릭해 코드를 복사합니다.
![Desktop View](/assets/img/2022-10-03/8.png){: width="100%" }
<br>
<br>
<br>

9. 최상위 폴더에서 pubspec.yaml 파일을 열어 아래와 같이 복사한 코드를 붙여 넣기 합니다. ``geolocator``도 마찬가지로 코드를 복사 붙여넣기 하고 오른쪽 상단의 ``Pub get``을 클릭해 작성 코드를 적용시켜주세요. (Pub get을 클릭하지 않으면 적용되지 않습니다.)
![Desktop View](/assets/img/2022-10-03/9.png){: width="100%" }
<br>
<br>
<br>

10. ``geolocator`` 페이지로 돌아와 스크롤를 아래로 내립니다. Usage에서 iOS 탭을 클릭해주세요.
![Desktop View](/assets/img/2022-10-03/10.png){: width="100%" }
<br>
<br>
<br>

11. iOS 장치 위치에 엑세스하기 위해 info.plist 파일에 아래 코드를 추가해야 합니다. 복사 버튼을 클릭해 복사해주세요.
![Desktop View](/assets/img/2022-10-03/11.png){: width="100%" }
<br>
<br>
<br>

12. ios > Runner > Info.plist 파일을 열어 맨 아래쪽에 복사한 코드를 붙여넣기 합니다. (String 문구는 앱에 맞게 변경 가능 합니다.)
![Desktop View](/assets/img/2022-10-03/12.png){: width="100%" }
<br>
<br>
<br>

13. 다시 ``geolocator`` 페이지로 돌아와 Usage에서 이번에는 Android 탭을 클릭해주세요. 권한 추가를 위해 아래 코드를 추가해야 합니다. 복사 버튼을 클릭해 복사해주세요.
![Desktop View](/assets/img/2022-10-03/13.png){: width="100%" }
<br>
<br>
<br>

14. 마지막으로 android/app/src/main/AndroidManifest.xml 파일을 열어 해당 위치에 붙여넣기해주시면 세팅 완료입니다.
![Desktop View](/assets/img/2022-10-03/14.png){: width="100%" }
<br>
<br>
<br>

## 구글맵(Google) 불러오기
---
**Notice** : 안드로이드 스튜디오에서 GooglePlay가 지원되는 시뮬레이터로 테스트 해주세요!
![Desktop View](/assets/img/2022-10-03/15.png){: width="100%" }



```dart
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  //latitude - 위도, longitude -경도
  static final LatLng companyLatLng = LatLng(
    37.5233273, //위도
      126.921252, //경도
  ); 

  //줌 확대 기능
  static final CameraPosition initialPosition = CameraPosition(
    target: companyLatLng,
    zoom: 15,
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GoogleMap(
        /*파라미터
        initialCameraPosition : 처음 구글 실행했을 때 어디에 위치할지
        myLocationEnabled : 지도에 파란색 점으로 현재 위치를 표시
        myLocationButtonEnabled : 사용자 위치를 화면 중앙으로 가져오는 데 사용되는 버튼
        mapType : 표시할 지도의 유형(일반, 위성, 하이브리드 및 지형)을 지정
        zoomGesturesEnabled : 지도 보기가 확대/축소 제스처에 응답해야 하는지 여부
        onMapCreated : 지도를 사용할 준비가 되었을 때 콜백
        minMaxZoomPreference : zoom 최대/최소
        onCameraIdle : 카메라 이동이 멈췄을 때*/
        mapType:MapType.normal,
        initialCameraPosition: initialPosition,
      ),
    );
  }
}
```
![Desktop View](/assets/img/2022-10-03/16.png){: width="100%" }
<br>
<br>
<br>

## 구글맵(Google) 권한 허용
---
```dart
  ...생략
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: renderAppBar(),
      body: FutureBuilder( //future의 상태가 변경 될때마다 builder를 재실행합니다.
        future : checkPermission(), //무조건 체크퍼미션 형태만 가능 , 허용 동의 창이 뜹니다.
        builder: (BuildContext context, AsyncSnapshot snapshot){
          //connectionState ->
          //none : 퓨처 파라미터를 안썼을때
          //waiting : 함수가 실행 중일때
          //done : 함수가 끝났을때
          if(snapshot.connectionState == ConnectionState.waiting) {
            return Center(
              child: CircularProgressIndicator(), //함수가 실행중일때 대기 아이콘을 그려줍니다.
            );
          }
          //checkPermission 함수의 결과값 = snapshot.data
          if(snapshot.data == "위치 권한이 허용되었습니다.") {
            return Column(
              children: [
                _CustomGoogleMap(initialPosition: initialPosition),
              ],
            );
          }
          return Center(
            child: Text(snapshot.data),
          );
        }
      )
    );
  }

  //위치 권한 설정 async로 작얿한다. 권한 승인을 기다려야하므로,
  //빌드 될때 호출해주면 됩니다.
  checkPermission() async {
    //로케이션 서비스(위치서비스 기능)가 활성화 되어있는지
    final isLocationEnabled = await Geolocator.isLocationServiceEnabled();

    if(!isLocationEnabled) {
      return '위치 서비스를 활성화 해주세요.';
    }

    //현재 지금 앱이 가지고 있는 위치 서비스에 대한 권한이 어떻게 되는지
    //LocationPermission ->
    //denied : 맨처음 앱을 실행했을때의 상태 디폴드값
    //deniedForever : 권한 요청을 떴을 때 권한을 안줌(재요청안돼서 사용자가 직접 설정해야 합니다.)
    //always : 권한을 허용했음
    //whileInUse : 앱을 실행 중에만 허용했음

    LocationPermission checkedPermission = await Geolocator.checkPermission();

    if(checkedPermission == LocationPermission.denied){
      //권한요청을 띄움
      checkedPermission = await Geolocator.requestPermission();

      if(checkedPermission == LocationPermission.denied) {
        return "위치 권한을 허용해주세요.";
      }

    }

    if(checkedPermission == LocationPermission.deniedForever) {
      return "앱의 위치 권한을 세팅해서 허용해주세요.";
    }

    return '위치 권한이 허용되었습니다.';

  }
```


