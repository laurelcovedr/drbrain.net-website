import data from '@/public/resources/report-data.json';
export const brainReport=data;
export type ReportRow={structure:string;volume_ml:number;icv_pct:number;reference_pct:number[]};
export const aboveRange=(r:ReportRow)=>r.icv_pct<r.reference_pct[0]||r.icv_pct>r.reference_pct[1];
export const reportModules=[
 {id:'overview',label:'Overview'},
 {id:'aging',label:'Brain aging'},
 {id:'structure',label:'Cognition'},
 {id:'ventricles',label:'Ventricles'},
 {id:'cerebellum',label:'Cerebellum'},
 {id:'white-matter',label:'White matter'},
 {id:'vascular',label:'Vascular'},
 {id:'review',label:'Clinical review'},
];
export const brainAgeGap=brainReport.brain_age.predicted_years-brainReport.patient.age_years;
export const recalculatedWmhPct=brainReport.wmh.volume_ml/brainReport.global.icv_ml*100;
