import {brandMessaging} from './yiwei-brand';
import {technologies} from './yiwei-technology';
import {careSettings} from './yiwei-care-settings';
export type Article = {id:string;title:string;authors:string;journal:string;year:string;kind:string;relation:string;products:string[];summary:string;limits:string;url:string;doi:string;component?:string;institutions?:string[];citation?:string;researchRole?:string;publicationNote?:string;suppliedPdf?:string;metrics?:{value:string;label:string}[]};
export const articles:Article[]=[
  {
    "id": "veca",
    "component": "Screening · VR & eye tracking",
    "title": "A portable and efficient dementia screening tool using eye tracking machine learning and virtual reality",
    "authors": "Xu Y, Zhang C, Pan B, Yuan Q, Zhang X",
    "journal": "npj Digital Medicine",
    "year": "2024",
    "kind": "Clinical study",
    "relation": "YIWEI-coauthored screening research",
    "products": [
      "dr-brain"
    ],
    "summary": "The VECA study evaluated eye tracking, VR and machine learning in 201 participants in Shenzhen. The model predicted MoCA scores and classified cognitive impairment across educational groups.",
    "limits": "Single-location study; performance is specific to the studied population and model. Correlation is not diagnostic accuracy. International validation and marketed-version equivalence require confirmation.",
    "url": "https://www.nature.com/articles/s41746-024-01206-5",
    "doi": "10.1038/s41746-024-01206-5",
    "metrics": [
      {
        "value": "201",
        "label": "study participants"
      },
      {
        "value": "r = 0.90",
        "label": "correlation with MoCA"
      },
      {
        "value": "88.5%",
        "label": "reported sensitivity"
      },
      {
        "value": "83%",
        "label": "reported specificity"
      }
    ],
    "institutions": [
      "Shenzhen Baoan Chronic Disease Prevention and Cure Hospital",
      "Shenzhen University",
      "YIWEI Medical Technology"
    ],
    "citation": "npj Digital Medicine. 2024;7:219.",
    "researchRole": "The author affiliations include YIWEI Medical Technology; the study evaluates the VECA screening approach.",
    "suppliedPdf": "/resources/research/veca.pdf"
  },
  {
    "id": "mri-veca",
    "component": "Screening & diagnosis · MRI + eye tracking",
    "title": "Application value of structural MRI combined with computerized cognitive assessment based on VR eye-tracking technology in early diagnosis of Alzheimer's disease",
    "authors": "Wei ZN et al.",
    "journal": "Chinese Journal of Magnetic Resonance Imaging",
    "year": "2024",
    "kind": "Clinical study",
    "relation": "Study using Dr.Brain™ technology",
    "products": [
      "dr-brain"
    ],
    "summary": "A study of 77 early-AD patients and 58 cognitively unimpaired participants combined Dr.Brain™ hippocampal measurements with VR eye-tracking assessment. The combined model had an AUC of 0.825, compared with 0.629 for hippocampal volume alone.",
    "limits": "Single-center, cross-sectional study with education imbalance. The combined model result is not a standalone product claim or proof of population-wide diagnostic performance.",
    "url": "https://www.med-sci.cn/cgzcx/articlexml.asp?doi=10.12015/issn.1674-8034.2024.06.007&html=",
    "doi": "10.12015/issn.1674-8034.2024.06.007",
    "institutions": [
      "Peking University Shenzhen Hospital",
      "Shenzhen University"
    ],
    "citation": "Chinese Journal of Magnetic Resonance Imaging. 2024;15(6):49–53.",
    "metrics": [
      {
        "value": "135",
        "label": "77 early-AD + 58 control participants"
      },
      {
        "value": "0.825",
        "label": "combined-model AUC"
      },
      {
        "value": "0.629",
        "label": "hippocampal-volume AUC"
      }
    ],
    "researchRole": "The paper combines Dr.Brain™ quantitative MRI with VR eye-tracking cognitive assessment.",
    "suppliedPdf": "/resources/research/mri-veca.pdf"
  },
  {
    "id": "hippocampus",
    "component": "Diagnosis · Structural MRI",
    "title": "Hippocampal and Amygdalar Morphological Abnormalities in Alzheimer's Disease Based on Three Chinese MRI Datasets",
    "authors": "Wei Y, Huang N, Liu Y, Zhang X, Wang S, Tang X",
    "journal": "Current Alzheimer Research",
    "year": "2020",
    "kind": "Imaging research",
    "relation": "YIWEI-affiliated research",
    "products": [
      "dr-brain"
    ],
    "summary": "Across three Chinese MRI datasets, localized shape analysis identified hippocampal and amygdalar abnormalities associated with Alzheimer’s disease and mild cognitive impairment. Shape measures added information beyond whole-structure volume and correlated with cognitive scores.",
    "limits": "Research evidence for structural biomarkers; it does not establish the performance of every Dr.Brain™ module or current software version.",
    "url": "https://www.eurekaselect.com/article/114340",
    "doi": "10.2174/1567205018666210218150223",
    "institutions": [
      "Southern University of Science and Technology",
      "Chinese Academy of Sciences, Brainnetome Center",
      "Chinese PLA General Hospital",
      "YIWEI Medical Technology"
    ],
    "citation": "Current Alzheimer Research. 2020;17(13):1221–1231.",
    "researchRole": "YIWEI-affiliated co-authorship contributes to the scientific basis of quantitative structural imaging.",
    "publicationNote": "The supplied document is a pre-publication proof. The citation and DOI identify the published article.",
    "metrics": [
      {
        "value": "3",
        "label": "Chinese MRI datasets"
      }
    ],
    "suppliedPdf": "/resources/research/hippocampus.pdf"
  },
  {
    "id": "brain-age",
    "component": "Diagnosis · Brain-age research",
    "title": "Predicting Age Using Neuroimaging: Innovative Brain Ageing Biomarkers",
    "authors": "Cole JH, Franke K",
    "journal": "Trends in Neurosciences",
    "year": "2017",
    "kind": "Review",
    "relation": "Scientific background",
    "products": [
      "dr-brain"
    ],
    "summary": "A review of MRI-based brain-age estimation and its potential as a research biomarker. It provides context for the brain-aging section of the English Brain Doctor report.",
    "limits": "Independent background literature. It does not validate the Dr.Brain™ brain-age model, provide a lifespan forecast, or supply an individual diagnostic threshold.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29074032/",
    "doi": "10.1016/j.tins.2017.10.001"
  },
  {
    "id": "perfusion",
    "component": "Stroke imaging · Perfusion analysis",
    "title": "Comparison of Two Software Packages for Perfusion Imaging: Ischemic Core and Penumbra Estimation and Patient Triage in Acute Ischemic Stroke",
    "authors": "Zhou X, Nan Y, Ju J, Zhou J, Xiao H, Wang S",
    "journal": "Cells",
    "year": "2022",
    "kind": "Clinical study",
    "relation": "Product-specific comparative research",
    "products": [
      "realnow"
    ],
    "summary": "In 594 acute ischemic stroke cases, RealNow™ and RAPID were compared on CT or MR perfusion core and penumbra volumes and imaging-based thrombectomy eligibility. Volume ICCs ranged from 0.87 to 0.99; triage decisions agreed in 159/174 CT cases and 400/420 MR cases.",
    "limits": "A retrospective software-comparison study. Volume agreement does not ensure identical triage for every patient or demonstrate improved functional outcomes. Acquisition, thresholds and clinical review remain relevant.",
    "url": "https://www.mdpi.com/2073-4409/11/16/2547",
    "doi": "10.3390/cells11162547",
    "institutions": [
      "Tongji Hospital, Tongji University",
      "First and Second Affiliated Hospitals of Nanjing Medical University",
      "YIWEI Medical Technology"
    ],
    "citation": "Cells. 2022;11(16):2547.",
    "researchRole": "Direct comparison of RealNow™ perfusion postprocessing with RAPID, with YIWEI-affiliated co-authorship.",
    "publicationNote": "The supplied document is a peer-review manuscript. The citation and DOI identify the final published article.",
    "metrics": [
      {
        "value": "594",
        "label": "174 CT + 420 MR cases"
      },
      {
        "value": "0.87–0.99",
        "label": "volume agreement, ICC"
      },
      {
        "value": "91% / 95%",
        "label": "CT / MR triage concordance"
      }
    ],
    "suppliedPdf": "/resources/research/perfusion.pdf"
  },
  {
    "id": "defuse3",
    "component": "Stroke pathway · Imaging selection",
    "title": "Thrombectomy for Stroke at 6 to 16 Hours with Selection by Perfusion Imaging",
    "authors": "Albers GW et al.",
    "journal": "New England Journal of Medicine",
    "year": "2018",
    "kind": "Randomized trial",
    "relation": "Clinical-pathway background",
    "products": [
      "realnow"
    ],
    "summary": "DEFUSE 3 studied thrombectomy in patients selected using perfusion imaging. It explains the clinical context for core, penumbra and mismatch measurements.",
    "limits": "An independent treatment trial using its specified imaging-selection workflow. It is not a RealNow™ regulatory approval or direct validation study.",
    "url": "https://www.nejm.org/doi/full/10.1056/NEJMoa1713973",
    "doi": "10.1056/NEJMoa1713973"
  },
  {
    "id": "community",
    "component": "Screening · Community research",
    "title": "Community screening for dementia among older adults in China: a machine learning-based strategy",
    "authors": "Zhang Y et al.",
    "journal": "BMC Public Health",
    "year": "2024",
    "kind": "Clinical study",
    "relation": "YIWEI-coauthored screening research",
    "products": [
      "dr-brain"
    ],
    "summary": "Among 823 adults aged 65 or older in Shenzhen, machine-learning models combined AD8 responses with health characteristics to screen for cognitive impairment. The multilayer perceptron achieved an AUC of 0.83 ± 0.04, compared with 0.65 for the AD8 reference approach.",
    "limits": "Community data with cross-validation, without independent international validation. This AD8-based model does not directly establish VR hardware performance, rehabilitation efficacy or full-pathway dementia outcomes.",
    "url": "https://link.springer.com/article/10.1186/s12889-024-18692-7",
    "doi": "10.1186/s12889-024-18692-7",
    "institutions": [
      "Shenzhen Center for Chronic Disease Control",
      "Shenzhen University",
      "YIWEI Medical Technology"
    ],
    "citation": "BMC Public Health. 2024;24:1206.",
    "researchRole": "YIWEI appears in the author affiliations. The paper supports community-screening research rather than a rehabilitation-treatment claim.",
    "metrics": [
      {
        "value": "823",
        "label": "community participants, age 65+"
      },
      {
        "value": "0.83 ± 0.04",
        "label": "MLP model AUC"
      }
    ],
    "suppliedPdf": "/resources/research/community.pdf"
  },
  {
    "id": "stars",
    "component": "ADHD · Independent digital intervention",
    "title": "A novel digital intervention for actively reducing severity of paediatric ADHD (STARS-ADHD): a randomised controlled trial",
    "authors": "Kollins SH et al.",
    "journal": "The Lancet Digital Health",
    "year": "2020",
    "kind": "Randomized trial",
    "relation": "Independent field evidence",
    "products": [
      "forcus"
    ],
    "summary": "A randomized controlled trial of the AKL-T01 digital intervention in children with ADHD. It provides a reference for attention-focused digital intervention design and clinical evaluation.",
    "limits": "This study evaluates AKL-T01, a different product. Its results and authorization cannot be transferred to ForcusGenius™.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/33334505/",
    "doi": "10.1016/S2589-7500(20)30017-0"
  },
  {
    "id": "adhd-meta",
    "component": "ADHD · Cognitive-training research",
    "title": "Cognitive training for attention-deficit/hyperactivity disorder: meta-analysis of clinical and neuropsychological outcomes from randomized controlled trials",
    "authors": "Cortese S et al.",
    "journal": "Journal of the American Academy of Child & Adolescent Psychiatry",
    "year": "2015",
    "kind": "Meta-analysis",
    "relation": "Independent field evidence",
    "products": [
      "forcus"
    ],
    "summary": "This meta-analysis found gains in targeted working-memory performance, with limited effects on ADHD symptoms in blinded ratings. It helps define appropriate outcome measures for cognitive training.",
    "limits": "Background evidence across other interventions. Improvements on trained tasks should not be equated with broad clinical benefit or a ForcusGenius™ treatment effect.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25721181/",
    "doi": "10.1016/j.jaac.2014.12.010"
  },
  {
    "id": "autism-gaze",
    "component": "Autism · Social-attention research",
    "title": "Eye-tracking study on facial emotion recognition tasks in individuals with high-functioning autism spectrum disorders",
    "authors": "Tsang V",
    "journal": "Autism",
    "year": "2018",
    "kind": "Behavioral study",
    "relation": "Research cited in supplied material",
    "products": [
      "autismshield"
    ],
    "summary": "An eye-tracking study of facial-emotion recognition and visual attention in autistic and comparison participants. It provides background for social-attention tasks described in the supplied child-development material.",
    "limits": "Group-level research findings are not an individual diagnostic test. This is not a validation study of AutismShield™.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29490486/",
    "doi": "10.1177/1362361316667830"
  },
  {
    "id": "autism-vr",
    "component": "Autism · VR training research",
    "title": "Virtual Reality Social Cognition Training for children with high functioning autism",
    "authors": "Didehbani N, Allen T, Kandalaft M, Krawczyk D, Chapman S",
    "journal": "Computers in Human Behavior",
    "year": "2016",
    "kind": "Pilot study",
    "relation": "Independent field evidence",
    "products": [
      "autismshield"
    ],
    "summary": "A pilot study investigated virtual social-cognition training in 30 children aged 7–16, using ten sessions over five weeks. It provides context for VR social-skills practice.",
    "limits": "Small pilot study of a different intervention and selected population. It does not establish AutismShield™ efficacy or generalize to every autistic child.",
    "url": "https://www.sciencedirect.com/science/article/pii/S0747563216303089",
    "doi": "10.1016/j.chb.2016.04.033"
  },
  {
    "id": "ad-metabolites",
    "title": "Metabolite Profile of Alzheimer’s Disease in the Frontal Cortex as Analyzed by HRMAS 1H NMR",
    "authors": "Zhang Y, Liu Z, Ji B, Liu L, Wu S, Liu X, Wang S, Wang L",
    "journal": "Frontiers in Aging Neuroscience",
    "year": "2019",
    "kind": "Laboratory study",
    "relation": "YIWEI-coauthored foundational research",
    "component": "Foundational research · Alzheimer’s metabolism",
    "summary": "High-resolution magnetic resonance spectroscopy examined postmortem frontal-cortex tissue from 11 Alzheimer’s disease cases and 11 controls. Metabolite differences, including glucose-related signals and APOE-associated patterns, were explored as a basis for further biomarker research.",
    "limits": "An ex vivo tissue study with a small sample. It does not validate a clinical screening test, quantitative MRI software or any marketed Dr.Brain™ module.",
    "institutions": [
      "Longhua People’s Hospital, Shenzhen",
      "Nanchang University",
      "Emory University",
      "YIWEI Medical Technology"
    ],
    "citation": "Frontiers in Aging Neuroscience. 2019;10:424.",
    "doi": "10.3389/fnagi.2018.00424",
    "url": "https://doi.org/10.3389/fnagi.2018.00424",
    "products": [
      "dr-brain"
    ],
    "researchRole": "The paper includes YIWEI-affiliated co-authorship and provides foundational Alzheimer’s biomarker research.",
    "metrics": [
      {
        "value": "22",
        "label": "postmortem tissue cases"
      },
      {
        "value": "11 / 11",
        "label": "Alzheimer’s / control cases"
      }
    ],
    "suppliedPdf": "/resources/research/ad-metabolites.pdf"
  },
  {
    "id": "wmh-segmentation",
    "title": "Deep-Learning-Based Segmentation and Localization of White Matter Hyperintensities on Magnetic Resonance Images",
    "authors": "Jiang W, Lin F, Zhang J, Zhan T, Cao P, Wang S",
    "journal": "Interdisciplinary Sciences: Computational Life Sciences",
    "year": "2020",
    "kind": "Technical validation",
    "relation": "YIWEI-coauthored imaging research",
    "component": "Diagnosis · White-matter quantification",
    "summary": "Deep-learning segmentation approaches were evaluated on two open MRI datasets, followed by regional white-matter hyperintensity analysis in 213 clinical cases with cerebral ischemia or lacunes. The study examines automated lesion delineation and anatomical localization.",
    "limits": "Algorithm and regional-imaging research, rather than a prospective clinical-outcome trial. Performance on these datasets does not establish equivalence to every current Dr.Brain™ software version.",
    "institutions": [
      "University of Hong Kong",
      "Harbin Institute of Technology",
      "YIWEI Medical Technology"
    ],
    "citation": "Interdisciplinary Sciences: Computational Life Sciences. 2020;12:438–446.",
    "doi": "10.1007/s12539-020-00398-0",
    "url": "https://doi.org/10.1007/s12539-020-00398-0",
    "products": [
      "dr-brain"
    ],
    "researchRole": "YIWEI-affiliated authors investigate segmentation methods relevant to the white-matter section of quantitative brain MRI reports.",
    "metrics": [
      {
        "value": "213",
        "label": "clinical MRI cases"
      },
      {
        "value": "2",
        "label": "open evaluation datasets"
      }
    ],
    "suppliedPdf": "/resources/research/wmh-segmentation.pdf"
  },
  {
    "id": "frontal-ad-case",
    "title": "Neuropsychological and behavioral features in a case of frontal-variant Alzheimer’s disease",
    "authors": "Li P, Quan W, Zhang H, Zhou Y",
    "journal": "Supplied clinical case-report manuscript",
    "year": "2021",
    "kind": "Case report",
    "relation": "Case using Dr.Brain™ analysis",
    "component": "Diagnosis · Differential assessment",
    "summary": "A single patient with cognitive and behavioral changes underwent detailed neuropsychological assessment and multimodal imaging. The manuscript describes Dr.Brain™ regional-volume analysis as part of distinguishing frontal-variant Alzheimer’s disease from behavioral-variant frontotemporal dementia.",
    "limits": "A single illustrative case cannot establish diagnostic sensitivity, specificity or clinical efficacy. Quantitative MRI formed one part of a broader clinical and biomarker assessment.",
    "institutions": [
      "Tianjin Huanhu Hospital",
      "Tianjin Medical University General Hospital"
    ],
    "citation": "Supplied case-report manuscript, dated 2021.",
    "doi": "10.3760/cma.j.cn101721-20210602-00030",
    "url": "",
    "products": [
      "dr-brain"
    ],
    "researchRole": "The source explicitly describes brain-region analysis using the Brain Doctor / Dr.Brain™ software.",
    "metrics": [
      {
        "value": "1",
        "label": "clinical case"
      }
    ],
    "publicationNote": "The English title is translated from the supplied Chinese manuscript. Journal and final publication details have not been independently verified; the DOI is reproduced from that document.",
    "suppliedPdf": "/resources/research/frontal-ad-case.pdf"
  },
  {
    "id": "brain-volume-validation",
    "title": "A preliminary study of automated brain-region segmentation and volumetry in Alzheimer’s disease diagnosis",
    "authors": "Li HB, Tang XQ, Chen Y, Xiao HH, Wang SL",
    "journal": "Chinese Journal of Magnetic Resonance Imaging",
    "year": "2021",
    "kind": "Technical validation",
    "relation": "YIWEI-associated imaging research",
    "component": "Diagnosis · Automated volumetry",
    "summary": "Automated measurements were compared with manual measurements in 204 healthy MRI scans. A separate comparison of 34 Alzheimer’s disease cases and 34 controls examined 47 brain regions. The reported measurement agreement and regional-volume differences support further clinical investigation.",
    "limits": "A preliminary measurement study with a small disease-comparison cohort. Agreement with manual measurement is not diagnostic accuracy and does not establish longitudinal treatment benefit.",
    "institutions": [
      "Second Xiangya Hospital, Central South University",
      "YIWEI Medical Technology"
    ],
    "citation": "Chinese Journal of Magnetic Resonance Imaging. 2021;12(6):27–33.",
    "doi": "10.12015/issn.1674-8034.2021.06.006",
    "url": "https://doi.org/10.12015/issn.1674-8034.2021.06.006",
    "products": [
      "dr-brain"
    ],
    "researchRole": "Clinical and YIWEI researchers evaluate an automated brain-structure measurement approach.",
    "metrics": [
      {
        "value": "204",
        "label": "healthy scans for measurement comparison"
      },
      {
        "value": "34 + 34",
        "label": "Alzheimer’s cases + controls"
      }
    ],
    "publicationNote": "English title translated and edited for clarity from the supplied Chinese-language article.",
    "suppliedPdf": "/resources/research/brain-volume-validation.pdf"
  },
  {
    "id": "pumch-cortical-atrophy",
    "title": "Distribution of Cortical Atrophy Associated with Cognitive Decline in Alzheimer’s Disease: A Cross-Sectional Quantitative Structural MRI Study from PUMCH Dementia Cohort",
    "authors": "Mao C, Hou B, Li J, Chu S, Huang X, Wang J, Dong L, Liu C, Feng F, Peng B, Gao J",
    "journal": "Current Alzheimer Research",
    "year": "2022",
    "kind": "Clinical imaging study",
    "relation": "Clinical study using Dr.Brain™",
    "component": "Diagnosis · Cortical volume & thickness",
    "summary": "In the PUMCH dementia cohort, quantitative MRI of 111 patients with probable Alzheimer’s disease examined cortical volume, thickness and cognitive performance across mild, moderate and severe disease. Regional atrophy, especially in left temporoparietal and occipital areas, was associated with cognitive impairment.",
    "limits": "A cross-sectional cohort. Associations across severity groups do not establish longitudinal prediction, standalone diagnosis or treatment-response monitoring.",
    "institutions": [
      "Peking Union Medical College Hospital",
      "Chinese Academy of Medical Sciences"
    ],
    "citation": "Current Alzheimer Research. 2022;19(8):618–627.",
    "doi": "10.2174/1567205019666220905145756",
    "url": "https://doi.org/10.2174/1567205019666220905145756",
    "products": [
      "dr-brain"
    ],
    "researchRole": "The methods explicitly identify Dr.Brain™ for quantitative MRI processing.",
    "metrics": [
      {
        "value": "111",
        "label": "probable Alzheimer’s disease cases"
      },
      {
        "value": "48 / 38 / 25",
        "label": "mild / moderate / severe groups"
      }
    ],
    "suppliedPdf": "/resources/research/pumch-cortical-atrophy.pdf"
  },
  {
    "id": "ad-ftld-differentiation",
    "title": "Early-stage differentiation between Alzheimer’s disease and frontotemporal lobe degeneration: Clinical, neuropsychology, and neuroimaging features",
    "authors": "Li P, Quan W, Wang Z, Liu Y, Cai H, Chen Y, Wang Y, Zhang M, Tian Z, Zhang H, Zhou Y",
    "journal": "Frontiers in Aging Neuroscience",
    "year": "2022",
    "kind": "Clinical imaging study",
    "relation": "Clinical study using Dr.Brain™",
    "component": "Diagnosis · Alzheimer’s & FTLD assessment",
    "summary": "A retrospective comparison of 95 Alzheimer’s disease and 106 frontotemporal lobar degeneration cases integrated clinical, neuropsychological and neuroimaging findings. Dr.Brain™ volume and white-matter measurements contributed to the assessment of differing regional patterns.",
    "limits": "Retrospective, selected clinical groups. The study supports complementary differential assessment, without establishing a standalone Dr.Brain™ diagnostic classifier or population-screening accuracy.",
    "institutions": [
      "Tianjin Huanhu Hospital",
      "Tianjin Medical University General Hospital"
    ],
    "citation": "Frontiers in Aging Neuroscience. 2022;14:981451.",
    "doi": "10.3389/fnagi.2022.981451",
    "url": "https://doi.org/10.3389/fnagi.2022.981451",
    "products": [
      "dr-brain"
    ],
    "researchRole": "Dr.Brain™ is explicitly described in the quantitative volumetric and white-matter imaging methods.",
    "metrics": [
      {
        "value": "201",
        "label": "retrospective clinical cases"
      },
      {
        "value": "95 / 106",
        "label": "Alzheimer’s / FTLD cases"
      }
    ],
    "suppliedPdf": "/resources/research/ad-ftld-differentiation.pdf"
  },
  {
    "id": "diabetes-mci-mri",
    "title": "Brain structural alterations detected by an automatic quantified tool as an indicator for MCI diagnosing in type 2 diabetes mellitus patients: A magnetic resonance imaging study",
    "authors": "Gu J, Cui S, Qi H, Li J, Wu W, Wang S, Ni J, Miao Z",
    "journal": "Heliyon",
    "year": "2022",
    "kind": "Clinical imaging study",
    "relation": "Clinical study using Dr.Brain™",
    "component": "Diagnosis · Diabetes-associated cognitive impairment",
    "summary": "Quantitative MRI compared 18 patients with type 2 diabetes and mild cognitive impairment, 18 with diabetes without MCI, and 18 healthy controls. Dr.Brain™ regional volumes were used to explore structural differences and classification features.",
    "limits": "A small, exploratory three-group study. Reported classification performance requires larger external validation and cannot be generalized to all patients with diabetes or cognitive symptoms.",
    "institutions": [
      "Huadong Sanatorium, Wuxi",
      "Wuxi No. 2 People’s Hospital, Nanjing Medical University",
      "YIWEI Medical Technology"
    ],
    "citation": "Heliyon. 2022;8:e09390.",
    "doi": "10.1016/j.heliyon.2022.e09390",
    "url": "https://doi.org/10.1016/j.heliyon.2022.e09390",
    "products": [
      "dr-brain"
    ],
    "researchRole": "The study uses Dr.Brain™ automated volumetry and includes YIWEI-affiliated co-authorship.",
    "metrics": [
      {
        "value": "54",
        "label": "study participants"
      },
      {
        "value": "18 × 3",
        "label": "participants per clinical group"
      }
    ],
    "suppliedPdf": "/resources/research/diabetes-mci-mri.pdf"
  },
  {
    "id": "mri-ai-review",
    "title": "Application and Approvals of MRI-Based Artificial Intelligence Technology for the Detection of Alzheimer’s Disease",
    "authors": "Zeng XW, Wang SL, Guo JJ, Wang XL, Lin ZL",
    "journal": "China Medical Device Information",
    "year": "2022",
    "kind": "Technical & regulatory review",
    "relation": "YIWEI-coauthored technical review",
    "component": "Diagnosis · MRI-AI research & regulatory context",
    "summary": "This review describes MRI features and artificial-intelligence approaches for Alzheimer’s disease assessment, alongside the domestic and international software-approval landscape reported in 2022.",
    "limits": "Historical technical and regulatory context, not a clinical efficacy study or evidence of current approval in any market. Institutional affiliation does not imply regulatory endorsement of this website or product line.",
    "institutions": [
      "Guangdong Center for Certification and Evaluation",
      "YIWEI Medical Technology"
    ],
    "citation": "China Medical Device Information. 2022;28(13):1–9.",
    "doi": "",
    "url": "",
    "products": [
      "dr-brain"
    ],
    "researchRole": "The authors include a YIWEI researcher and researchers from Guangdong’s drug-administration evaluation center.",
    "publicationNote": "Chinese-language review with an English abstract. No DOI is provided in the supplied article.",
    "suppliedPdf": "/resources/research/mri-ai-review.pdf"
  },
  {
    "id": "chinese-neurocognitive-battery",
    "title": "Development and Validation of an Automatic Computerized Neurocognitive Battery in Chinese",
    "authors": "Zhang J, Hong ZY, Yang L, Li XJ, Ye F",
    "journal": "American Journal of Alzheimer’s Disease & Other Dementias",
    "year": "2024",
    "kind": "Assessment validation",
    "relation": "YIWEI-supported assessment research",
    "component": "Screening · Computerized cognitive assessment",
    "summary": "An automated four-subtest Chinese neurocognitive battery was evaluated in 86 volunteers aged 51–82. Scores were compared with paper-based tests, and automated scoring showed correlations of 0.904–1.0 with manual scoring.",
    "limits": "A limited Chinese-language validation sample. Scoring agreement is not diagnostic sensitivity or a treatment effect. Equivalence to the marketed QuickMind or VECA configuration has not been established.",
    "institutions": [
      "Sichuan Provincial People’s Hospital, UESTC",
      "Chengdu 363 Hospital, Southwest Medical University"
    ],
    "citation": "American Journal of Alzheimer’s Disease & Other Dementias. 2024;39:1–11.",
    "doi": "10.1177/15333175241271910",
    "url": "https://doi.org/10.1177/15333175241271910",
    "products": [
      "dr-brain"
    ],
    "researchRole": "The acknowledgments credit YIWEI engineers for software architecture and programming; this is a documented technical contribution, rather than YIWEI author affiliation.",
    "metrics": [
      {
        "value": "86",
        "label": "volunteers, age 51–82"
      },
      {
        "value": "4",
        "label": "cognitive subtests"
      },
      {
        "value": "0.904–1.0",
        "label": "automated vs manual scoring, r"
      }
    ],
    "suppliedPdf": "/resources/research/chinese-neurocognitive-battery.pdf"
  },
  {
    "id": "realnow-aspects",
    "title": "Comparison of consistency in acute stroke: Automated ASPECT score software tools and manual consensus scores",
    "authors": "Liu D, Yuan J, Ren R, Gao W, Guo L, Ni J",
    "journal": "European Journal of Radiology",
    "year": "2024",
    "kind": "Comparative imaging study",
    "relation": "Product-specific comparative research",
    "component": "Stroke imaging · Automated ASPECTS",
    "summary": "In 174 retrospectively selected acute-stroke cases, RealNow™, RAPID and ShuKun automated ASPECTS were compared with radiologist consensus based on diffusion-weighted MRI. RealNow™’s total-score agreement with the reference was ICC 0.60, and its reported AUC was 0.67; regional agreement varied.",
    "limits": "Retrospective, single-center comparison with modest agreement and variable regional performance. The study does not establish universal superiority, equivalence in every case or improved patient outcomes; clinician image review remains essential.",
    "institutions": [
      "Wuxi No. 2 People’s Hospital, Nanjing Medical University",
      "Wuxi No. 9 People’s Hospital, Soochow University",
      "Jiangnan University",
      "YIWEI Medical Technology"
    ],
    "citation": "European Journal of Radiology. 2024;175:111435.",
    "doi": "10.1016/j.ejrad.2024.111435",
    "url": "https://doi.org/10.1016/j.ejrad.2024.111435",
    "products": [
      "realnow"
    ],
    "researchRole": "Direct evaluation of the RealNow™ ASPECTS tool, with YIWEI-affiliated co-authorship.",
    "metrics": [
      {
        "value": "174",
        "label": "acute-stroke cases"
      },
      {
        "value": "0.60",
        "label": "RealNow™ vs reference, ICC"
      },
      {
        "value": "0.67",
        "label": "reported RealNow™ AUC"
      }
    ],
    "suppliedPdf": "/resources/research/realnow-aspects.pdf"
  },
  {
    "id": "mri-pet-synthesis",
    "title": "MRI-to-PET synthesis via deep learning for amyloid-β quantification in Alzheimer’s disease",
    "authors": "Chen Z, Bi S, Shan Y et al., for the Alzheimer’s Disease Neuroimaging Initiative",
    "journal": "European Radiology",
    "year": "2026",
    "kind": "Multicenter imaging research",
    "relation": "YIWEI-coauthored translational research",
    "component": "Emerging research · MRI-to-PET synthesis",
    "summary": "ShareGAN generated synthetic amyloid-β PET from structural MRI using paired imaging from 1,009 participants across ADNI and three Chinese hospitals. Amyloid-status accuracy was 88.5% and 89.4% in two external test sets; the study explores support for selecting patients for confirmatory PET.",
    "limits": "Retrospective translational research. Synthetic PET is not a replacement for real amyloid PET or treatment eligibility assessment. This publication does not establish that MRI-to-PET synthesis is an available or approved Dr.Brain™ product module.",
    "institutions": [
      "Xuanwu Hospital, Capital Medical University",
      "Nanjing First Hospital",
      "First Hospital of Hebei Medical University",
      "YIWEI Medical Technology"
    ],
    "citation": "European Radiology. 2026;36:5125–5137.",
    "doi": "10.1007/s00330-025-12251-3",
    "url": "https://doi.org/10.1007/s00330-025-12251-3",
    "products": [
      "dr-brain"
    ],
    "researchRole": "Two authors are affiliated with YIWEI Medical Technology. The paper extends the research context for quantitative dementia imaging.",
    "metrics": [
      {
        "value": "1,009",
        "label": "participants with paired MRI / PET"
      },
      {
        "value": "88.5% / 89.4%",
        "label": "amyloid-status accuracy, external sets"
      }
    ],
    "publicationNote": "Published online 7 January 2026. Emerging research is presented separately from current product capabilities.",
    "suppliedPdf": "/resources/research/mri-pet-synthesis.pdf"
  }
];
export type Product={slug:string;name:string;subtitle:string;category:string;number:string;tag:string;description:string;features:{title:string;text:string}[];applications:string[];workflow:string[];resource:string;source:string;image?:string;relatedResources?:{title:string;description:string;url:string}[]};
export const products:Product[]=[
 {slug:'dr-brain',name:'Dr.Brain™',subtitle:'Dementia care solution',category:'Dementia care',number:'01',tag:'Screening · Diagnosis · Rehabilitation',description:'Screening, quantitative brain imaging and guided rehabilitation for dementia care.',features:[{title:'Screening',text:'QuickMind eye-tracking and structured cognitive assessment support screening and referral.'},{title:'Diagnosis',text:'Quantitative MRI and Brain Doctor reports inform clinician-led diagnostic evaluation.'},{title:'Rehabilitation',text:'QuickMind cognitive and motor practice supports individualized plans in the clinic and at home.'}],applications:['Memory and brain health clinics','Community screening programs','Cognitive rehabilitation services','Senior care and clinician-guided home care'],workflow:['Screen: assess cognition and identify the need for further evaluation','Diagnose: combine clinical assessment with quantitative imaging and reviewed reports','Rehabilitate: set an individual plan, record practice and review progress'],resource:'/reports/brain-health',source:'https://www.drbrain.net/product-fw.aspx',image:'/media/quickmind-care.webp',relatedResources:[{title:'QuickMind overview',description:'Screening and rehabilitation module within the Dr.Brain™ solution.',url:'/resources/quickmind-brochure.pdf'},{title:'QuickMind home care',description:'Explore the supported home configuration.',url:'https://quickmindstore.com/'}]},
 {slug:'realnow',name:'RealNow™',subtitle:'Stroke care solution',category:'Stroke care',number:'02',tag:'CT · CTA · CTP · MRP',description:'AI-assisted brain imaging for stroke assessment and clinical review.',features:[{title:'Non-contrast CT',text:'Hemorrhage identification, volume analysis and module-specific ASPECTS assessment.'},{title:'Vascular analysis',text:'Vessel reconstruction and analysis of occlusion, stenosis and vascular findings.'},{title:'Perfusion assessment',text:'Core, penumbra and mismatch measurements from supported CT or MR imaging.'}],applications:['Stroke centers and emergency pathways','Radiology departments','Multidisciplinary stroke review','Perfusion-imaging research'],workflow:['Import supported CT or MR imaging','Generate module-specific measurements','Review images, maps and segmentation','Use verified results in the clinical pathway'],resource:'/resources/realnow-brochure.pdf',source:'https://www.drbrain.net/product-nb.aspx',image:'/media/realnow-clinical.webp'},
 {slug:'autismshield',name:'AutismShield™',subtitle:'Autism support solution',category:'Child development',number:'03',tag:'Autism · VR + tablet',description:'VR and tablet practice for social attention and developmental skills.',features:[{title:'Social-attention tasks',text:'Gaze activities examine social cues, where appropriate for the child.'},{title:'Structured skill practice',text:'VR and tablet activities support selected developmental goals.'},{title:'Family participation',text:'Caregivers and clinicians review training records and adapt the plan.'}],applications:['Developmental pediatrics','Autism rehabilitation services','Individualized family-supported practice','Social-attention research'],workflow:['Define individual developmental goals','Choose tolerable, age-appropriate activities','Monitor gaze, task responses and engagement','Review progress within the broader care plan'],resource:'/resources/virtualbrain-overview.pdf',source:'https://www.drbrain.net/product-nb2_en.aspx'},
 {slug:'forcus',name:'ForcusGenius™',subtitle:'ADHD support solution',category:'Child development',number:'04',tag:'ADHD · VR + tablet',description:'Guided VR and tablet practice for attention and executive function.',features:[{title:'Focused attention tasks',text:'Sustained-attention practice with controlled distractors.'},{title:'Adaptive practice',text:'Clinician-selected tasks with adjustable difficulty.'},{title:'Measurable sessions',text:'Responses, reaction times and errors support progress review.'}],applications:['Child development and rehabilitation clinics','Pediatric neurology services','Clinician-guided family training','Attention and learning-support programs'],workflow:['Review the child’s clinical assessment','Select appropriate tasks and difficulty','Record practice and tolerability','Review task performance with family and clinician'],resource:'/resources/virtualbrain-overview.pdf',source:'https://www.drbrain.net/product-nb2_en.aspx'}
];
export const productAliases:Record<string,string>={'quickmind':'dr-brain','virtualbrain-asd':'autismshield','virtualbrain-adhd':'forcus'};
export const sections=['products','technology','evidence','care-settings','reports','about','contact'];
export const titleFor=(section:string,slug?:string)=>section==='reports'&&slug==='brain-health'?'Brain Health Report':section==='care-settings'?(slug?careSettings.find(s=>s.slug===slug)?.label??'Care settings':'Care settings'):section==='technology'&&slug?(technologies.find(t=>t.slug===slug)?.label??'Brain science & technology'):section==='about'&&slug==='company'?'Company profile':section==='about'&&slug==='global-in-practice'?'Global in practice':section==='about'&&slug==='global-registrations'?'Global registrations & compliance':slug?(section==='evidence'?'Clinical evidence: ':'')+(products.find(p=>p.slug===(productAliases[slug]??slug))?.name??'Brain Doctor Report'):({products:'Our solutions',technology:'Brain science & technology',evidence:'Clinical evidence',reports:'Brain Doctor reports',about:'About YIWEI MEDICAL',contact:'Connect with YIWEI MEDICAL'}[section]??brandMessaging.slogan);
