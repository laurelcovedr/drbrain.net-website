import Link from '@/components/site-link';
import {productQuestions} from '@/lib/yiwei-faq';
export function ProductQuestions({slug}:{slug:string}){
 const questions=productQuestions[slug];if(!questions)return null;
 return <section className="product-chapter product-questions" id="questions" aria-labelledby="product-questions-title"><div className="chapter-heading"><span className="eyebrow">PRODUCT QUESTIONS</span><h2 id="product-questions-title">Questions about this solution</h2></div><div className="product-question-grid">{questions.map(q=><article key={q.question}><h3>{q.question}</h3><p>{q.answer}</p><Link className="text-link" href={q.link}>{q.linkLabel}</Link></article>)}</div></section>;
}
