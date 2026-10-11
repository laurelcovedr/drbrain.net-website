export type RegulatoryRegion={id:string;name:string;label:string;summary:string;documented?:boolean};
export type RegulatoryRecord={id:string;region:string;title:string;registeredName:string;number:string;kind:string;issuer:string;date:string;validity:string;scope:string;note:string;products:string[];sourceDocuments:{title:string;url:string}[];classification?:string;verification:string;officialSource?:{title:string;url:string};supporting?:boolean;identifierLabel:string};
export const reportedMarketRegions:RegulatoryRegion[]=[
 {id:'malaysia',name:'Malaysia',label:'Registration in progress',summary:'YIWEI’s September 2026 overseas presentation lists registration in progress, with a year-end 2026 target. Approval and certificate details have not been supplied.',documented:false},
 {id:'singapore',name:'Singapore',label:'Registration in progress',summary:'YIWEI’s September 2026 overseas presentation lists registration in progress, with a year-end 2026 target. Approval and certificate details have not been supplied.',documented:false},
 {id:'indonesia',name:'Indonesia',label:'Registration in progress',summary:'YIWEI’s September 2026 overseas presentation lists registration in progress, with a year-end 2026 target. Approval and certificate details have not been supplied.',documented:false},
];
export const regulatoryRegions:RegulatoryRegion[]=[
  {
    "id": "united-states",
    "name": "United States",
    "label": "FDA 510(k)",
    "summary": "RealNow™ CT perfusion software received FDA 510(k) clearance under K213891."
  },
  {
    "id": "europe",
    "name": "Europe",
    "label": "Class I regulatory documentation",
    "summary": "German notification records for cognitive, attention and ASD systems, alongside earlier CE-related imaging documentation."
  },
  {
    "id": "china",
    "name": "China",
    "label": "NMPA & Guangdong MPA",
    "summary": "Eight device-registration records covering dementia imaging, stroke imaging and supporting image infrastructure."
  },
  {
    "id": "thailand",
    "name": "Thailand",
    "label": "Thai FDA",
    "summary": "QuickMind cognitive VR and RealNow™ imaging are documented through listed and notified device certificates."
  },
  {
    "id": "hong-kong",
    "name": "Hong Kong",
    "label": "Department of Health · MDACS",
    "summary": "Virtual Brain cognitive-assessment and training software is documented under MDACS listing 261055."
  },
  {
    "id": "brazil",
    "name": "Brazil",
    "label": "ICC conformity certification",
    "summary": "VR-ASD has an ICC compliance certificate referencing medical electrical-safety and electromagnetic-compatibility standards."
  },
 ...reportedMarketRegions,
];
export const regulatoryRecords:RegulatoryRecord[]=[
  {
    "id": "drbrain-ad-cn",
    "region": "china",
    "title": "DrBrain-AD",
    "registeredName": "MRI Image-Assisted Assessment Software · DrBrain-AD, release 1.0",
    "number": "NMPA 20233211362",
    "kind": "Medical device registration",
    "issuer": "National Medical Products Administration (NMPA)",
    "date": "19 September 2023; address amendment 23 December 2025",
    "validity": "19 September 2023 – 18 September 2028",
    "scope": "Brain MRI display and T1-weighted image analysis to assist evaluation of hippocampal abnormalities in patients aged 55–70.",
    "note": "The registered indication requires radiologist review and comprehensive clinical assessment. It covers the specified imaging software, rather than the whole Dr.Brain™ screening–diagnosis–rehabilitation pathway.",
    "products": [
      "dr-brain"
    ],
    "sourceDocuments": [
      {
        "title": "Registration certificate",
        "url": "/resources/registrations/drbrain-ad-cn.pdf"
      },
      {
        "title": "2025 registration amendment",
        "url": "/resources/registrations/drbrain-ad-cn-amendment.pdf"
      }
    ],
    "verification": "Supplied document reviewed",
    "identifierLabel": "Record number"
  },
  {
    "id": "ich-cn",
    "region": "china",
    "title": "Intracranial hemorrhage triage",
    "registeredName": "Intracranial Hemorrhage CT Image-Assisted Triage Software",
    "number": "NMPA 20243210666",
    "kind": "Registration amendment",
    "issuer": "National Medical Products Administration (NMPA)",
    "date": "4 January 2026",
    "validity": "Base certificate validity not stated in the supplied amendment",
    "scope": "The amendment identifies the registered CT-assisted triage software and updates the registrant and manufacturing addresses.",
    "note": "This amendment must be used with the base registration certificate. The underlying model, indication details and validity period are not reproduced in this file. Associated with the RealNow™ stroke-imaging line by its CT-triage function.",
    "products": [
      "realnow"
    ],
    "sourceDocuments": [
      {
        "title": "2026 registration amendment",
        "url": "/resources/registrations/ich-cn-amendment.pdf"
      }
    ],
    "verification": "Supplied document reviewed",
    "identifierLabel": "Record number"
  },
  {
    "id": "tihip-cn",
    "region": "china",
    "title": "TIHip MRI processing",
    "registeredName": "MRI Image Processing Software · TIHip association from the supplied file label",
    "number": "Guangdong MPA 20212210359",
    "kind": "Registration amendment",
    "issuer": "Guangdong Medical Products Administration",
    "date": "18 December 2025",
    "validity": "Base certificate validity not stated in the supplied amendment",
    "scope": "Registrant and manufacturing address amendments for the registered MRI image-processing software.",
    "note": "The supplied file associates this record with TIHip. The amendment must accompany its base certificate and does not establish a new indication or extend the registration term.",
    "products": [
      "dr-brain"
    ],
    "sourceDocuments": [
      {
        "title": "2025 registration amendment",
        "url": "/resources/registrations/tihip-cn-amendment.pdf"
      }
    ],
    "verification": "Supplied document reviewed",
    "identifierLabel": "Record number"
  },
  {
    "id": "realnow-cn",
    "region": "china",
    "title": "RealNow™ perfusion imaging",
    "registeredName": "Medical Image Processing Software · RealNow, release V1.0",
    "number": "Guangdong MPA 20222210075",
    "kind": "Medical device registration",
    "issuer": "Guangdong Medical Products Administration",
    "date": "26 January 2022",
    "validity": "26 January 2022 – 25 January 2027",
    "scope": "Display, processing and basic editing of DICOM 3.0-compliant brain-perfusion medical images.",
    "note": "The registered scope expressly excludes automatic diagnosis. The registration applies to the listed RealNow™ release and indication.",
    "products": [
      "realnow"
    ],
    "sourceDocuments": [
      {
        "title": "Registration certificate",
        "url": "/resources/registrations/realnow-cn.pdf"
      }
    ],
    "verification": "Supplied document reviewed",
    "identifierLabel": "Record number"
  },
  {
    "id": "realnow-plus-cn",
    "region": "china",
    "title": "RealNow+ brain imaging",
    "registeredName": "Brain Medical Image Processing Software · RealNow+ association from the supplied file label",
    "number": "Guangdong MPA 20232210283",
    "kind": "Registration amendment",
    "issuer": "Guangdong Medical Products Administration",
    "date": "6 November 2024",
    "validity": "Base certificate validity not stated in the supplied amendment",
    "scope": "Updates the registrant and manufacturing addresses of the registered brain medical-image processing software.",
    "note": "The supplied file associates this record with RealNow+. The base certificate, full registered indication and validity period are not included in this amendment.",
    "products": [
      "realnow"
    ],
    "sourceDocuments": [
      {
        "title": "2024 registration amendment",
        "url": "/resources/registrations/realnow-plus-cn-amendment.pdf"
      }
    ],
    "verification": "Supplied document reviewed",
    "identifierLabel": "Record number"
  },
  {
    "id": "realnow-icta-cn",
    "region": "china",
    "title": "RealNow-iCTA",
    "registeredName": "Medical Image Processing Software · RealNow-iCTA association from the supplied file label",
    "number": "Guangdong MPA 20232210162",
    "kind": "Registration amendment",
    "issuer": "Guangdong Medical Products Administration",
    "date": "24 December 2025",
    "validity": "Base certificate validity not stated in the supplied amendment",
    "scope": "Updates registrant and manufacturing addresses for the registered medical image-processing software.",
    "note": "The supplied file associates this record with RealNow-iCTA. The amendment is used with its base certificate; detailed indication and validity are not stated in this file.",
    "products": [
      "realnow"
    ],
    "sourceDocuments": [
      {
        "title": "2025 registration amendment",
        "url": "/resources/registrations/realnow-icta-cn-amendment.pdf"
      }
    ],
    "verification": "Supplied document reviewed",
    "identifierLabel": "Record number"
  },
  {
    "id": "limpio-cn",
    "region": "china",
    "title": "LIMPIO image infrastructure",
    "registeredName": "Medical Image Storage and Transmission Software · LIMPIO",
    "number": "Guangdong MPA 20222210168",
    "kind": "Medical device registration",
    "issuer": "Guangdong Medical Products Administration",
    "date": "30 January 2022",
    "validity": "30 January 2022 – 29 January 2027",
    "scope": "Storage, transmission, management and display of medical images.",
    "note": "The registered scope excludes automatic diagnosis. This is supporting company imaging infrastructure, rather than registration of one of the four solution lines.",
    "products": [],
    "sourceDocuments": [
      {
        "title": "Registration certificate",
        "url": "/resources/registrations/limpio-cn.pdf"
      }
    ],
    "verification": "Supplied document reviewed",
    "identifierLabel": "Record number"
  },
  {
    "id": "tipacs-cn",
    "region": "china",
    "title": "TIPACS image infrastructure",
    "registeredName": "Medical Image Transmission and Processing Software · TIPACS",
    "number": "Guangdong MPA 20202210069",
    "kind": "Medical device registration",
    "issuer": "Guangdong Medical Products Administration",
    "date": "8 January 2024; effective 15 January 2025",
    "validity": "15 January 2025 – 14 January 2030",
    "scope": "Reception, transmission, storage, display and management of medical images.",
    "note": "The registered scope excludes automatic diagnosis. The certificate is company infrastructure documentation and retains the original registration number.",
    "products": [],
    "sourceDocuments": [
      {
        "title": "Registration certificate",
        "url": "/resources/registrations/tipacs-cn.pdf"
      }
    ],
    "verification": "Supplied document reviewed",
    "identifierLabel": "Record number"
  },
  {
    "id": "realnow-fda",
    "region": "united-states",
    "title": "RealNow™ · FDA 510(k) clearance",
    "registeredName": "RealNow · Medical image management and processing system",
    "number": "K213891",
    "kind": "FDA 510(k) clearance",
    "issuer": "U.S. Food and Drug Administration",
    "date": "24 February 2023",
    "validity": "No fixed expiry is stated in the clearance letter",
    "scope": "Professional viewing, processing, analysis and communication of brain CT-perfusion scans, including perfusion and blood-volume parameter maps.",
    "note": "The clearance is specific to the stated CT-perfusion indication. It does not establish FDA clearance of MR perfusion, hemorrhage triage, CTA, ASPECTS or other YIWEI products. Ongoing U.S. regulatory obligations apply.",
    "products": [
      "realnow"
    ],
    "sourceDocuments": [
      {
        "title": "FDA clearance letter",
        "url": "/resources/registrations/realnow-fda-k213891.pdf"
      }
    ],
    "verification": "Matched to the published FDA clearance package",
    "identifierLabel": "Record number",
    "classification": "Class II · 21 CFR 892.2050 · LLZ",
    "officialSource": {
      "title": "FDA clearance and indications for use",
      "url": "https://www.accessdata.fda.gov/cdrh_docs/pdf21/K213891.pdf"
    }
  },
  {
    "id": "virtual-brain-third-party-us",
    "region": "united-states",
    "title": "Virtual Brain · third-party record",
    "registeredName": "Virtual Brain",
    "number": "3029991455",
    "kind": "Third-party registration statement",
    "issuer": "RCT Testing (not FDA)",
    "date": "8 May 2024",
    "validity": "Current annual FDA registration/listing status has not been independently verified",
    "scope": "The third-party document reports an establishment registration and device-listing record for YIWEI and Virtual Brain.",
    "note": "This is a private third-party statement, not an FDA-issued certificate or device clearance. FDA registration and listing do not constitute approval or clearance. It is retained as supporting documentation and is not used as a product-approval badge.",
    "products": [],
    "sourceDocuments": [
      {
        "title": "Third-party statement (non-official)",
        "url": "/resources/registrations/virtual-brain-third-party-us.pdf"
      }
    ],
    "verification": "Supplied document reviewed",
    "identifierLabel": "Establishment number reported by the third party",
    "officialSource": {
      "title": "FDA explanation of registration and listing",
      "url": "https://www.fda.gov/medical-devices/device-registration-and-listing/important-reminders-about-registration-and-listing"
    },
    "supporting": true
  },
  {
    "id": "tihip-europe",
    "region": "europe",
    "title": "Dr. Brain TIHip · CE-related record",
    "registeredName": "Dr. Brain · Medical Image Processing Software · TIHip Version 1",
    "number": "DIMDI Anzeige 00303939",
    "kind": "Historical CE compliance documentation",
    "issuer": "Supplied Verification of Compliance bearing DIMDI details",
    "date": "1 May 2020",
    "validity": "No expiry is stated; current MDR conformity was not established from this file",
    "scope": "Class I manufacturer-declaration route under Annex VII of Directive 93/42/EEC; technical file YW-CE-TechDOC-001, version 8.5a.",
    "note": "A historical MDD-era compliance verification. It refers to manufacturer responsibilities before CE marking and does not establish present MDR status or notified-body certification.",
    "products": [
      "dr-brain"
    ],
    "sourceDocuments": [
      {
        "title": "2020 Verification of Compliance",
        "url": "/resources/registrations/tihip-europe-2020.pdf"
      }
    ],
    "verification": "Supplied document reviewed",
    "identifierLabel": "Record number",
    "classification": "Class I as stated in the 2020 document"
  },
  {
    "id": "white-matter-europe",
    "region": "europe",
    "title": "Dr. Brain White Matter · CE-related record",
    "registeredName": "Dr. Brain White Matter · Medical Image Processing Software",
    "number": "DIMDI Anzeige 00312717",
    "kind": "Historical CE compliance documentation",
    "issuer": "Supplied Verification of Compliance bearing DIMDI details",
    "date": "31 July 2020",
    "validity": "No expiry is stated; current MDR conformity was not established from this file",
    "scope": "Class I manufacturer-declaration route under Annex VII of Directive 93/42/EEC; technical file YW-CE-TechDOC-002, version 1a.",
    "note": "Historical documentation for the named white-matter software. It does not establish present MDR conformity or approval of the broader Dr.Brain™ solution.",
    "products": [
      "dr-brain"
    ],
    "sourceDocuments": [
      {
        "title": "2020 Verification of Compliance",
        "url": "/resources/registrations/white-matter-europe-2020.pdf"
      }
    ],
    "verification": "Supplied document reviewed",
    "identifierLabel": "Record number",
    "classification": "Class I as stated in the 2020 document"
  },
  {
    "id": "cognitive-germany",
    "region": "europe",
    "title": "Cognitive VR · German notification",
    "registeredName": "VR Cognitive Assessment and Rehab Training System",
    "number": "DE/CA20/00215136",
    "kind": "Class I notification documentation",
    "issuer": "Crealkraft GmbH / German Office of Suzhou Care-Real Medical Technology; authority named: Bezirksregierung Düsseldorf",
    "date": "Registration stated: 23 April 2026; certificate dated 15 May 2026",
    "validity": "No expiry is stated in the supplied certificate",
    "scope": "The certificate documents notification of a Class I VR cognitive-assessment and rehabilitation-training system, with software on mobile devices.",
    "note": "The certificate is prepared by the representative on the basis of a notification form. It is presented as registration documentation, rather than an independently verified government-issued approval or notified-body certificate. The registered trade name is shown separately from Dr.Brain™ solution branding.",
    "products": [
      "dr-brain"
    ],
    "sourceDocuments": [
      {
        "title": "Certificate of registration",
        "url": "/resources/registrations/vr-cognitive-germany.pdf"
      }
    ],
    "verification": "Supplied document reviewed",
    "identifierLabel": "Record number",
    "classification": "Class I as stated in the certificate"
  },
  {
    "id": "attention-germany",
    "region": "europe",
    "title": "Attention VR · German notification",
    "registeredName": "VR Attention Assessment and Rehab Training System",
    "number": "DE/CA20/00214749",
    "kind": "Class I notification documentation",
    "issuer": "Crealkraft GmbH / German Office of Suzhou Care-Real Medical Technology; authority named: Bezirksregierung Düsseldorf",
    "date": "Registration stated: 23 April 2026; certificate dated 15 May 2026",
    "validity": "No expiry is stated in the supplied certificate",
    "scope": "The certificate documents notification of a Class I VR attention-assessment and rehabilitation-training system, with software on mobile devices.",
    "note": "A representative-prepared registration certificate referring to a German notification form. The source names the attention system, not the ForcusGenius™ brand. It does not by itself establish ADHD treatment efficacy or notified-body approval.",
    "products": [
      "forcus"
    ],
    "sourceDocuments": [
      {
        "title": "Certificate of registration",
        "url": "/resources/registrations/vr-attention-germany.pdf"
      }
    ],
    "verification": "Supplied document reviewed",
    "identifierLabel": "Record number",
    "classification": "Class I as stated in the certificate"
  },
  {
    "id": "quickmind-thailand",
    "region": "thailand",
    "title": "QuickMind VR · Thai FDA listing",
    "registeredName": "QuickMind VR Cognitive Assessment and Rehab Training System · identifier Virtual Brain · V1.0.1.02",
    "number": "69-2-3-2-0005652",
    "kind": "Listed medical device certificate",
    "issuer": "Thai Food and Drug Administration, Ministry of Public Health",
    "date": "10 June 2026",
    "validity": "10 June 2026 – 9 June 2031",
    "scope": "Cognitive assessment and rehabilitation training for the populations stated in the attachment, including mild-to-moderate cognitive impairment and post-stroke cognitive impairment.",
    "note": "Thai Class 1 Non-IVD listing through the named importer and location. The attachment defines the system, software version and populations. Dates are converted from the Thai Buddhist calendar to Gregorian dates.",
    "products": [
      "dr-brain"
    ],
    "sourceDocuments": [
      {
        "title": "Thai FDA certificate and attachments",
        "url": "/resources/registrations/quickmind-thailand.pdf"
      }
    ],
    "verification": "Supplied document reviewed",
    "identifierLabel": "Record number",
    "classification": "Class 1 Non-IVD · FULL pathway"
  },
  {
    "id": "virtual-brain-hong-kong",
    "region": "hong-kong",
    "title": "Virtual Brain · MDACS listing",
    "registeredName": "Cognitive Dysfunction Assessment and Training Software · Virtual Brain V1",
    "number": "261055",
    "kind": "MDACS certificate of listing",
    "issuer": "Medical Device Division, Department of Health, Hong Kong SAR",
    "date": "6 May 2026",
    "validity": "6 May 2026 – 5 May 2031",
    "scope": "Listed as Software, Neuropsychological Therapeutic under Hong Kong’s Medical Device Administrative Control System.",
    "note": "Manufacturer named: Changsha YIWEI Medical Technology Co., Ltd. Local responsible person: Smart Idea Health Technology Limited. The listing applies to Virtual Brain V1; the document does not list the ForcusGenius™ or AutismShield™ trade names.",
    "products": [
      "dr-brain"
    ],
    "sourceDocuments": [
      {
        "title": "Certificate of listing",
        "url": "/resources/registrations/virtual-brain-hong-kong.pdf"
      }
    ],
    "verification": "Supplied document reviewed",
    "identifierLabel": "MDACS listing number",
    "officialSource": {
      "title": "Hong Kong Medical Device Division listing search",
      "url": "https://www.mdd.gov.hk/en/mdacs/search-database/index.html"
    }
  },
  {
    "id": "realnow-thailand",
    "region": "thailand",
    "title": "RealNow™ · Thai FDA notification",
    "registeredName": "Medical Image Processing Software · RealNow · release 1.0, full version V1.0.0.02",
    "number": "69-2-2-2-0006210",
    "kind": "Notified medical device certificate",
    "issuer": "Thai Food and Drug Administration, Ministry of Public Health",
    "date": "25 June 2026",
    "validity": "25 June 2026 – 31 December 2030",
    "scope": "Professional display, processing, analysis and communication of brain CT-perfusion imaging, including perfusion and tissue blood-volume maps.",
    "note": "Thai Class 2 Non-IVD notification under the abridged pathway, for the named importer, site and software. The certificate does not cover every RealNow™ imaging module. Dates are converted from the Thai Buddhist calendar.",
    "products": [
      "realnow"
    ],
    "sourceDocuments": [
      {
        "title": "Thai FDA certificate and attachments",
        "url": "/resources/registrations/realnow-thailand.pdf"
      }
    ],
    "verification": "Supplied document reviewed",
    "identifierLabel": "Record number",
    "classification": "Class 2 Non-IVD · ABRIDGED pathway"
  },
  {
    "id": "vr-asd-brazil",
    "region": "brazil",
    "title": "VR-ASD · ICC compliance certification",
    "registeredName": "LumiBrain · VR-ASD · VR Assessment and Rehabilitation Training System for Autism",
    "number": "MED 3728-01-26",
    "kind": "ICC conformity certificate",
    "issuer": "ICC – Instituto de Certificações e Conformidades · OCP 0174",
    "date": "31 August 2026",
    "validity": "No fixed end date; validity depends on maintenance assessments and conformity conditions",
    "scope": "Model 5 certification incorporating quality-system assessment and product testing. Referenced standards include ABNT NBR IEC 60601-1, 60601-1-2, 60601-1-6 and specified 60601-1-9 requirements.",
    "note": "A Brazilian conformity certificate for the VR-ASD model, brand LumiBrain, with software V1.0.0.01. It is not an ANVISA product registration or proof of autism-treatment efficacy. The complete four-page certificate is provided.",
    "products": [
      "autismshield"
    ],
    "sourceDocuments": [
      {
        "title": "Complete four-page ICC certificate",
        "url": "/resources/registrations/vr-asd-brazil-icc.pdf"
      }
    ],
    "verification": "Supplied document reviewed",
    "identifierLabel": "Record number"
  },
  {
    "id": "vr-asd-europe",
    "region": "europe",
    "title": "ASD system · European registration record",
    "registeredName": "ASD Assessment and Rehab Training System · VR-ASD, VR-ASD-A, VR-ASD-R, VR-ASD-H",
    "number": "0697478241AssessmentPC",
    "kind": "Class I / EUDAMED documentation",
    "issuer": "Crealkraft GmbH / German Office of Suzhou Care-Real Medical Technology; authority named: Bezirksregierung Düsseldorf",
    "date": "17 September 2026",
    "validity": "No expiry is stated in the supplied certificate",
    "scope": "The certificate states registration of the Class I ASD system in EUDAMED under Regulation (EU) 2017/745 and lists four VR-ASD models.",
    "note": "Representative-prepared registration documentation. The identifier shown is a Basic UDI-DI, not an approval number. Independent database confirmation and a declaration of conformity were not included in the supplied material.",
    "products": [
      "autismshield"
    ],
    "sourceDocuments": [
      {
        "title": "Certificate of registration",
        "url": "/resources/registrations/vr-asd-europe.pdf"
      }
    ],
    "verification": "Supplied document reviewed",
    "identifierLabel": "Basic UDI-DI",
    "classification": "Class I as stated in the certificate"
  }
];
