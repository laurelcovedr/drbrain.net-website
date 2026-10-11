export type MediaImage={id:string;src:string;title:string;alt:string;caption:string;source:string;width:number;height:number;illustrative?:boolean;viewport?:{x:number;y:number;width:number;height:number}};
const image=(id:string,title:string,alt:string,caption:string,source:string,width:number,height:number):MediaImage=>({id,src:'/media/'+id+'.webp',title,alt,caption,source,width,height});
export const mediaImages:MediaImage[]=[
 {id:'autismshield-care-illustration',src:'/media/autismshield-care-illustration.webp',title:'Social-attention practice',alt:'Illustration of a child practicing social cues on a tablet with a therapist, with a VR headset on the table',caption:'An illustrative care scenario for AutismShield™: therapist-guided social-attention practice using a tablet, with VR as a complementary activity format. This is a concept illustration, not an actual product interface.',source:'/products/autismshield',width:1536,height:1024,illustrative:true},
 {id:'bp-quickmind-device',src:'/media/bp/quickmind-device.png',title:'QuickMind assessment system',alt:'QuickMind VR headset, controllers and connected tablet',caption:'Original device illustration from YIWEI’s September 2026 overseas presentation, slide 7.',source:'/products/dr-brain',width:714,height:680},
 {id:'bp-structural-mri',src:'/media/bp/structural-mri.webp',title:'Structural MRI examples',alt:'Sagittal MRI examples showing regional structural patterns',caption:'Original imaging examples from YIWEI’s overseas presentation, slide 11. Illustrative material for clinical review, without an individual diagnosis.',source:'/technology/imaging-ai',width:867,height:355},
 {id:'bp-clinic-practice',src:'/media/bp/clinic-vr-practice.webp',title:'Immersive cognitive practice',alt:'An older adult using a VR headset beside a cognitive-task display',caption:'Original clinic rehabilitation photo from YIWEI’s overseas presentation, slide 16.',source:'/technology/digital-rehabilitation',width:888,height:499},
 {id:'bp-mri-pet-research',src:'/media/bp/mri-pet-research.webp',title:'MRI-to-PET research',alt:'Research figure comparing structural MRI, acquired amyloid PET and synthetic PET',caption:'Research figure reproduced in YIWEI’s overseas presentation, slide 14. Chen et al., European Radiology (2026). Synthetic PET remains a research estimate and does not replace confirmatory amyloid testing.',source:'/resources/research/mri-pet-synthesis.pdf',width:1012,height:1228},
 {id:'bp-ct-analysis',src:'/media/bp/ct-regional-analysis.webp',title:'CT regional analysis',alt:'CT brain images with regional color overlays for stroke-imaging review',caption:'Original stroke-imaging examples from YIWEI’s overseas presentation, slide 42. Illustrative module outputs require clinical review.',source:'/products/realnow',width:990,height:733},
 {id:'bp-perfusion-analysis',src:'/media/bp/perfusion-analysis.webp',title:'Perfusion analysis',alt:'Brain perfusion images and color overlays from the RealNow™ presentation',caption:'Original perfusion-imaging examples from YIWEI’s overseas presentation, slide 42. Illustrative module outputs require clinical review.',source:'/products/realnow',width:821,height:410},
 image('drbrain-neural-banner','Brain science and AI','A blue brain and connected data points in the original Dr.Brain™ banner','Original brain-science illustration from drbrain.net.','https://www.drbrain.net/images/banner1_01.jpg',1920,799),
 image('drbrain-mri-views','Multiplanar brain MRI','Coronal, sagittal and axial MRI views with highlighted findings in the original Dr.Brain™ module','Original Dr.Brain™ product visualization; shown as illustrative imaging material.','https://www.drbrain.net/web/images/20200213/6371720806257626045244128.jpg',1200,425),
 image('drbrain-platform','Neuroscience and computing','The original Dr.Brain™ platform illustration connecting brain science and computing','Original Dr.Brain™ platform illustration from the corporate website.','https://www.drbrain.net/images/nao.jpg',625,491),
 image('quickmind-screening','Assessment in practice','QuickMind headset, controller and task display','Original QuickMind assessment and rehabilitation material.','https://quickmindstore.com/wp-content/uploads/2025/10/1-w.webp',1440,1440),
 image('quickmind-vr-care','Clinic-guided practice','An older adult using VR with a clinical care team','Original QuickMind clinic-use illustration.','https://quickmindstore.com/wp-content/uploads/2025/09/1-w-2.webp',800,800),
 image('quickmind-home','Practice beyond the clinic','An older adult using a VR headset beside a home task display','Original QuickMind home-use illustration.','https://quickmindstore.com/wp-content/uploads/2024/12/1.webp',1440,1440),
 image('quickmind-report','Eye-tracking report','Pages of the English QuickMind eye-tracking cognitive assessment report','An example reporting format from the QuickMind website.','https://quickmindstore.com/wp-content/uploads/2025/09/baogao-w.webp',860,1022),
 image('quickmind-space-game','Attention task environment','QuickMind VR task scenes and completed-session examples','Shared VR platform material; tasks follow the selected care plan.','https://quickmindstore.com/wp-content/uploads/2025/09/%E7%81%AB%E7%AE%AD2-1-1.webp',803,697),
 image('quickmind-training-scene','Cognitive and motor activities','QuickMind memory, balance and motor task examples','Original task examples from the QuickMind platform.','https://quickmindstore.com/wp-content/uploads/2025/09/%E6%B8%B8%E6%88%8F%E5%9C%BA%E6%99%AF.webp',803,697),
 image('quickmind-clinician-dashboard','Connected practice portal','QuickMind rehabilitation portal on a laptop','Original portal interface from the QuickMind website.','https://quickmindstore.com/wp-content/uploads/2025/09/%E7%AC%94%E8%AE%B0%E6%9C%AC%E7%94%B5%E8%84%91%E6%AD%A3%E9%9D%A2%E5%9B%BE-1.webp',1306,981),
 image('quickmind-progress','Progress review','QuickMind training dashboard with session charts','Original platform reporting interface; shown as a product illustration.','https://quickmindstore.com/wp-content/uploads/2025/09/%E7%BB%9F%E8%AE%A1%E5%9B%BE4.webp',1306,981),
 image('realnow-ct','CT analysis','RealNow™ non-contrast CT analysis interface','Original RealNow™ CT module interface from drbrain.net.','https://www.drbrain.net/web/images/20230801/6382648811475700602147705.png',1817,929),
 image('realnow-aspects','ASPECTS review','RealNow™ ASPECTS interface with brain images and regional scores','Original RealNow™ module interface; image findings require clinical review.','https://www.drbrain.net/web/images/20230801/6382648814868581472780521.png',1817,929),
 image('realnow-vessels','Vascular imaging','RealNow™ vascular reconstruction and CTA review interface','Original RealNow™ angiography module interface.','https://www.drbrain.net/web/images/20230801/6382648817043066796306529.png',1817,929),
 image('realnow-perfusion','Perfusion maps','RealNow™ CT perfusion maps and mismatch measurements','Original RealNow™ perfusion interface.','https://www.drbrain.net/web/images/20230801/6382648820099431265270427.png',1817,929),
 image('virtualbrain-training','Shared VR activity library','Original Virtual Brain memory, balance and motor training scenes','Original VR platform material; individualized activities vary by solution.','https://www.drbrain.net/web/images/20230721/6382553308826263183218567.png',629,438),
 image('virtualbrain-scenes','Immersive environments','An original Virtual Brain immersive environment example','Original scene-customization material from drbrain.net.','https://www.drbrain.net/web/images/20230721/6382554531625666732652372.png',548,304),
 image('drbrain-mri','Imaging and reporting workflow','Dr.Brain™ original MRI acquisition, AI analysis and report workflow illustration','Original Dr.Brain™ workflow illustration; source interface labels are in Chinese.','https://www.drbrain.net/images/pt_03.jpg',1312,571),
];
const imageViewports:Record<string,NonNullable<MediaImage['viewport']>>={
 'bp-quickmind-device':{x:.035,y:0,width:.965,height:1},
 'bp-clinic-practice':{x:0,y:0,width:.94,height:.62},
 'realnow-ct':{x:.21,y:.13,width:.55,height:.67},
 'realnow-aspects':{x:.045,y:.105,width:.43,height:.83},
 'realnow-vessels':{x:.103,y:.13,width:.61,height:.82},
 'realnow-perfusion':{x:.103,y:.13,width:.745,height:.75},
};
export const getMediaImage=(id:string):MediaImage=>({...mediaImages.find(m=>m.id===id)!,viewport:imageViewports[id]});
export const productMedia:Record<string,string[]>={
 'dr-brain':['drbrain-mri-views','quickmind-report','quickmind-vr-care'],
 'realnow':['bp-ct-analysis','realnow-aspects','realnow-vessels','bp-perfusion-analysis'],
 'autismshield':['autismshield-care-illustration'],
 'forcus':['quickmind-space-game','quickmind-training-scene'],
};
export const productCover:Record<string,string>={'dr-brain':'drbrain-mri-views','realnow':'realnow-perfusion','autismshield':'autismshield-care-illustration','forcus':'quickmind-space-game'};
export const technologyMedia:Record<string,string[]>={
 'imaging-ai':['drbrain-mri-views','realnow-perfusion','realnow-vessels'],
 'eye-tracking':['bp-quickmind-device','quickmind-report'],
 'digital-rehabilitation':['quickmind-home','bp-clinic-practice'],
};
export const quickmindVideo={src:'/media/quickmind-demonstration.mp4',poster:'/media/quickmind-screening.webp',source:'https://quickmindstore.com/wp-content/uploads/2025/12/video/quickmind.mp4'};
export const companyLogo={src:'/media/yiwei-logo.png',source:'https://www.drbrain.net/images/logo-w.png',alt:'YIWEI MEDICAL official company logo',width:180,height:68};
