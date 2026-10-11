export const contactEmail='service@quickmindstore.com';
export type InquiryFields={name:string;email:string;organization:string;role:string;country:string;message:string};

export function prepareInquiryEmail(purpose:string,solution:string,fields:InquiryFields){
 const subject='YIWEI MEDICAL | '+purpose+' | '+solution;
 const body=['Hello YIWEI MEDICAL team,','',fields.message.trim(),'','Inquiry: '+purpose,'Solution: '+solution,'','Name: '+fields.name.trim(),'Email: '+fields.email.trim(),'Organization: '+(fields.organization.trim()||'Not specified'),'Role: '+(fields.role.trim()||'Not specified'),'Country / region: '+(fields.country.trim()||'Not specified'),'','Best regards,',fields.name.trim()].join('\n');
 return {subject,body,href:'mailto:'+contactEmail+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body)};
}
