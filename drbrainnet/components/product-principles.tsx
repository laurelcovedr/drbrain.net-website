/** @jsxImportSource @/lib/localized-jsx */
'use client';
import Link from '@/components/site-link';
import {MediaGallery} from '@/components/product-media';
export function ProductPrinciples({slug}:{slug:string}){
 const imaging=['dr-brain','realnow'].includes(slug);
 return <section id="principles" className="product-chapter product-principles"><h2>Technology Principles</h2><div className="deployment-grid">{(imaging?[
 ['Image Input','Supported imaging sequences are checked for quality before analysis.'],
 ['AI Quantification','Algorithms identify structures or regions and generate module-specific measurements and maps.'],
 ['Clinical Review','Specialists review the outputs with source images, clinical history and the relevant evidence.']
 ]:[
 ['Immersive Tasks','VR scenarios present structured visual and interactive activities in a controlled task environment.'],
 ['Eye Tracking and Responses','Supported modules record gaze and task responses. Measurements are interpreted within the assessment protocol.'],
 ['Individualized Training','Professionals select suitable activities and difficulty, then review session records to adjust the plan.']
 ]).map(([title,text])=><article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><Link className="text-link" href={imaging?'/technology/imaging-ai':'/technology/eye-tracking'}>Explore the technology</Link></section>
}
export function TrainingCoverage({slug}:{slug:string}){
 const asd=slug==='autismshield';
 return <section className="training-coverage"><h2>Training Tasks and Session Review</h2><p>Explore task interfaces from supplied product material. These illustrate training content, not a live clinical dashboard.</p><MediaGallery ids={asd?['brochure-asd-emotions','brochure-asd-social']:['brochure-adhd-training','quickmind-space-game']} title="Training Interface Examples"/><div className="deployment-grid">{(asd?[
 ['Emotion Recognition','Practice recognizing facial expressions and relevant social cues.'],['Social Interaction','Rehearse responses in structured social situations with professional guidance.'],['Social Attention','Review attention to task-relevant cues within an individualized plan.']
 ]:[
 ['Sustained Attention','Practice maintaining attention during structured tasks.'],['Response Control','Practice responding to relevant targets while managing distractors.'],['Executive Function','Select tasks and difficulty according to the professional assessment and training goals.']
 ]).map(([title,text])=><article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><h3>From Task Selection to Progress Review</h3><ol className="platform-review"><li>Select the participant and an appropriate activity</li><li>Guide the session and observe tolerability</li><li>Review task responses and session records</li><li>Adjust the next training plan with the clinician</li></ol></section>
}
