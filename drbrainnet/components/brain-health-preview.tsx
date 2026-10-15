/** @jsxImportSource @/lib/localized-jsx */
'use client';
import Link from '@/components/site-link';
import document from '@/lib/brain-health-document.json';

export function BrainHealthPreview(){return <div className="brain-health-preview source-document-preview" aria-label="Uploaded Brain Health Report cover"><Link href="/reports/brain-health" className="source-report-cover" aria-label="View the uploaded Brain Health Report"><img src={document.cover} width={document.coverWidth} height={document.coverHeight} alt="Original cover of the uploaded AI Brain Health and Longevity Report" loading="lazy"/></Link><div className="source-report-caption"><span>{document.pageCount}-page English report</span><span>De-identified sample · Clinical review required</span></div><div className="brain-health-preview-footer"><a href={document.pdf} target="_blank" rel="noreferrer" className="text-link">Open PDF</a><Link href="/reports/brain-health" className="text-link">Explore report pages</Link></div></div>}
