import type {MediaImage} from './yiwei-media';

export type FieldCase={id:string;market:string;setting:string;description:string;slide:number;photos:MediaImage[]};
const photo=(id:string,file:string,title:string,width:number,height:number,viewport?:MediaImage['viewport']):MediaImage=>({id,src:'/media/field/'+file,title,alt:title+' in a company-supplied field-use photo',caption:title,source:'/about/global-in-practice',width,height,viewport});

export const fieldCases:FieldCase[]=[
 {id:'hong-kong',market:'Hong Kong',setting:'Community & clinic',description:'Community cognitive assessment and clinic rehabilitation. The supplied case documents community screening in June 2025.',slide:2,photos:[
  photo('hk-community','hong-kong-community.jpeg','Community VR cognitive assessment',1600,1200,{x:.40,y:.32,width:.60,height:.66}),
  photo('hk-clinic','hong-kong-clinic.webp','Clinic VR rehabilitation practice',720,1280,{x:.25,y:.07,width:.75,height:.87}),
 ]},
 {id:'thailand',market:'Thailand',setting:'Hospital & outreach',description:'YIWEI’s overseas presentation reports cognitive assessment at Bumrungrad International Hospital and includes field material from a Thai mobile screening initiative.',slide:36,photos:[
  {id:'th-clinic',src:'/media/bp/thailand-clinic.jpeg',title:'Hospital cognitive-assessment setting',alt:'A participant and staff member beside a VR headset and English assessment display in Thailand',caption:'Company-supplied hospital-use photo, overseas presentation slide 36.',source:'/about/global-in-practice?market=thailand',width:784,height:1049},
  {id:'th-mobile',src:'/media/bp/thailand-mobile-units.jpg',title:'Thai mobile screening units',alt:'Mobile field units shown in YIWEI’s Thailand presentation',caption:'Company-supplied outreach photograph, overseas presentation slide 36. The image does not establish product-specific registration or clinical outcomes.',source:'/about/global-in-practice?market=thailand',width:678,height:452},
  {id:'th-team',src:'/media/bp/thailand-field-team.jpg',title:'Thailand field team',alt:'Field team photo from the Thailand section of YIWEI’s overseas presentation',caption:'Company-supplied field team photo, overseas presentation slide 36.',source:'/about/global-in-practice?market=thailand',width:1289,height:719},
 ]},
 {id:'malaysia',market:'Malaysia',setting:'Local demonstration',description:'A hands-on VR demonstration with participants and local teams.',slide:5,photos:[photo('my-demo','malaysia.webp','VR demonstration in Malaysia',960,1280)]},
 {id:'indonesia',market:'Indonesia',setting:'Guided VR practice',description:'Seated VR practice with handheld controllers and staff support.',slide:6,photos:[
  photo('id-practice','indonesia-practice.webp','Guided VR practice in Indonesia',960,1280),
  photo('id-session','indonesia-session.webp','Seated VR session in Indonesia',1170,2532,{x:.03,y:.065,width:.93,height:.79}),
 ]},
 {id:'saudi-arabia',market:'Saudi Arabia',setting:'Clinical team exchange',description:'A clinical team exchange shown in YIWEI’s supplied field-use presentation.',slide:4,photos:[photo('sa-team','saudi-arabia.webp','Clinical team exchange in Saudi Arabia',1080,1440,{x:0,y:.15,width:.58,height:.85})]},
 {id:'india',market:'India',setting:'Headset demonstration',description:'A participant trying the QuickMind VR headset.',slide:4,photos:[photo('in-demo','india.webp','QuickMind headset demonstration in India',961,1280)]},
 {id:'uzbekistan',market:'Uzbekistan',setting:'Interactive VR session',description:'A standing VR session using handheld controllers.',slide:4,photos:[photo('uz-session','uzbekistan.webp','Interactive VR session in Uzbekistan',1080,1439)]},
 {id:'italy',market:'Italy',setting:'Team demonstration',description:'A seated headset demonstration with the local team.',slide:5,photos:[photo('it-demo','italy.png','Team VR demonstration in Italy',383,159)]},
 {id:'kazakhstan',market:'Kazakhstan',setting:'Localized VR practice',description:'VR task practice with a localized task display and the care team.',slide:5,photos:[photo('kz-session','kazakhstan.webp','Localized VR task practice in Kazakhstan',1600,1200)]},
];
