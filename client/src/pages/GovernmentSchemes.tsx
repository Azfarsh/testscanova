import React, { useState, useEffect } from "react";
import emblem from '../../public/national-emblem.png'

// Define embedded styles to make the component fully independent
const styles = `
  /* Custom styles to prevent image flickering */
  .emblem-container {
    width: 96px;
    height: 96px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: #f9fafb;
    border-radius: 8px;
    overflow: hidden; /* Prevent image overflow */
  }

  .emblem-image {
    width: 80px;
    height: 80px;
    max-width: 80px;
    max-height: 80px;
    object-fit: contain;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
    will-change: opacity; /* Optimize for animation */
    z-index: 2; /* Ensure image is above placeholder */
    background-color: transparent; /* Prevent background color from showing through */
    display: block; /* Ensure proper layout */
  }

  .emblem-image.loading {
    opacity: 0;
  }

  .emblem-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .emblem-placeholder .w-10 {
    animation: pulse 1.5s infinite ease-in-out;
  }

  @keyframes pulse {
    0% {
      opacity: 0.6;
      transform: scale(0.98);
    }
    50% {
      opacity: 0.9;
      transform: scale(1);
    }
    100% {
      opacity: 0.6;
      transform: scale(0.98);
    }
  }

  /* Smooth card transitions */
  .scheme-card {
    transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
    transform: translateY(0);
  }

  .scheme-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .animate-fadeIn {
    animation: fadeIn 0.8s ease-in-out forwards;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

interface Scheme {
  id: string;
  name: string;
  description: string;
  eligibility: string;
  documents: string[];
  link: string;
  image: string;
  category: "State" | "Central";
  state?: string;
}

const schemes: Scheme[] = [
  // Central Government Schemes
  {
    id: "pmjay",
    name: "Ayushman Bharat - PMJAY",
    description: "A flagship scheme by the central government providing health coverage up to ₹5 lakhs per family.",
    eligibility: "Economically weaker sections (as per SECC 2011).",
    documents: ["Aadhaar Card", "Ration Card", "Income Certificate"],
    link: "https://pmjay.gov.in",
    image: "https://pmjay.gov.in/assets/img/logo.png",
    category: "Central",
  },
  {
    id: "cghs",
    name: "Central Government Health Scheme (CGHS)",
    description: "Comprehensive healthcare for central government employees and pensioners.",
    eligibility: "Central government employees and pensioners in CGHS-covered areas.",
    documents: ["Employee ID", "Pension Payment Order (for pensioners)"],
    link: "https://cghs.gov.in/",
    image: emblem,
    category: "Central",
  },
  {
    id: "esic",
    name: "Employees' State Insurance Scheme (ESIS)",
    description: "Social security for workers and their families with medical care and cash benefits.",
    eligibility: "Employees earning ₹21,000 or less per month.",
    documents: ["Employment Proof", "Salary Slip"],
    link: "https://www.esic.nic.in/",
    image: emblem,
    category: "Central",
  },
  {
    id: "aaby",
    name: "Aam Aadmi Bima Yojana (AABY)",
    description: "Social security scheme for rural landless households providing life and disability cover.",
    eligibility: "Rural landless household earning member aged 18–59 years.",
    documents: ["Aadhaar Card", "Proof of Occupation"],
    link: "https://www.licindia.in/Products/Insurance-Plan/Aam-Aadmi-Bima-Yojana",
    image: emblem,
    category: "Central",
  },
  {
    id: "rsby",
    name: "Rashtriya Swasthya Bima Yojana (RSBY)",
    description: "Health insurance scheme for Below Poverty Line families.",
    eligibility: "BPL families (up to five members).",
    documents: ["BPL Card", "Aadhaar Card"],
    link: "https://www.rsby.gov.in/",
    image: emblem,
    category: "Central",
  },

  // Andhra Pradesh
  {
    id: "ap-arogyasri",
    name: "Dr. YSR Aarogyasri",
    description: "Health insurance scheme for BPL families in Andhra Pradesh, covering 2434 medical procedures.",
    eligibility: "BPL families with annual income less than ₹5 lakhs.",
    documents: ["Aadhaar Card", "Income Certificate", "White Ration Card"],
    link: "https://www.ysraarogyasri.ap.gov.in/",
    image: "https://www.ysraarogyasri.ap.gov.in/ASRI_HTDOCS/images/YSR_Logo.png",
    category: "State",
    state: "Andhra Pradesh",
  },
  {
    id: "ap-jeevandhara",
    name: "Jeevandhara Scheme",
    description: "Financial assistance for organ transplantation for Andhra Pradesh residents.",
    eligibility: "Residents requiring kidney, liver or heart transplantation.",
    documents: ["Medical Reports", "Income Certificate", "Residence Proof"],
    link: "https://health.ap.gov.in/",
    image: emblem,
    category: "State",
    state: "Andhra Pradesh",
  },
  {
    id: "ap-chandranna",
    name: "Chandranna Bima Yojana",
    description: "Insurance scheme providing health, accident, and disability coverage to unorganized workers.",
    eligibility: "Unorganized workers aged 18-60 years.",
    documents: ["Aadhaar Card", "Bank Account Details", "Occupation Certificate"],
    link: "https://ap.gov.in/",
    image: emblem,
    category: "State",
    state: "Andhra Pradesh",
  },

  // Arunachal Pradesh
  {
    id: "ap-chiefministeraarogya",
    name: "Chief Minister Arogya Arunachal Yojana (CMAAY)",
    description: "Cashless healthcare services up to ₹5 lakhs per family annually in empaneled hospitals.",
    eligibility: "All residents of Arunachal Pradesh.",
    documents: ["CMAAY Card", "Aadhaar Card", "APST Certificate/Resident Proof"],
    link: "https://cmaay.com/",
    image: "https://cmaay.com/assets/img/headerlogo1.png",
    category: "State",
    state: "Arunachal Pradesh",
  },
  {
    id: "ap-arunachalswasthya",
    name: "Dulari Kanya Scheme",
    description: "Free healthcare for newborn girls up to the age of 12 years.",
    eligibility: "All newborn girls up to 12 years of age.",
    documents: ["Birth Certificate", "Parent's Identity Proof"],
    link: "https://health.arunachal.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Emblem_of_Arunachal_Pradesh.svg/1200px-Emblem_of_Arunachal_Pradesh.svg.png",
    category: "State",
    state: "Arunachal Pradesh",
  },
  {
    id: "ap-universalhealthscheme",
    name: "Universal Health Insurance Scheme",
    description: "Health insurance for BPL families across the state.",
    eligibility: "BPL families in Arunachal Pradesh.",
    documents: ["BPL Card", "Aadhaar Card", "Residential Proof"],
    link: "https://health.arunachal.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Emblem_of_Arunachal_Pradesh.svg/1200px-Emblem_of_Arunachal_Pradesh.svg.png",
    category: "State",
    state: "Arunachal Pradesh",
  },

  // Assam
  {
    id: "as-atal-amrit",
    name: "Atal Amrit Abhiyan",
    description: "Health insurance scheme for BPL and APL families covering six disease groups.",
    eligibility: "All residents of Assam with annual income below ₹5 lakhs.",
    documents: ["Aadhaar Card", "Income Certificate", "Residence Proof"],
    link: "https://atalamrit.assam.gov.in/",
    image: "https://atalaamritabhiyaan.assam.gov.in/images/logo.png",
    category: "State",
    state: "Assam",
  },
  {
    id: "as-sneha-sparsha",
    name: "Sneha Sparsha Scheme",
    description: "Free treatment for children with congenital heart disease.",
    eligibility: "Children up to 12 years with congenital heart disease.",
    documents: ["Birth Certificate", "Medical Reports", "BPL Certificate (if applicable)"],
    link: "https://assam.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Emblem_of_Assam.svg/1200px-Emblem_of_Assam.svg.png",
    category: "State",
    state: "Assam",
  },
  {
    id: "as-majoni",
    name: "Majoni Scheme",
    description: "Financial assistance to girl children including health benefits and educational support.",
    eligibility: "Girl child from BPL family in Assam.",
    documents: ["Birth Certificate", "BPL Card", "Bank Account Details"],
    link: "https://wcd.assam.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Emblem_of_Assam.svg/1200px-Emblem_of_Assam.svg.png",
    category: "State",
    state: "Assam",
  },

  // Bihar
  {
    id: "br-cm-medical-assistance",
    name: "Chief Minister Medical Assistance Fund Scheme",
    description: "Financial assistance for treatment of serious illnesses.",
    eligibility: "Residents of Bihar with serious medical conditions.",
    documents: ["Income Certificate", "Aadhaar Card", "Medical Reports"],
    link: "https://health.bihar.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Seal_of_Bihar.svg/1200px-Seal_of_Bihar.svg.png",
    category: "State",
    state: "Bihar",
  },
  {
    id: "br-sahara-yojana",
    name: "Mukhyamantri Chikitsa Sahayata Kosh",
    description: "Financial assistance for critical treatment for BPL families.",
    eligibility: "BPL cardholders requiring critical care treatment.",
    documents: ["BPL Card", "Aadhaar Card", "Hospital Estimate"],
    link: "https://health.bihar.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Seal_of_Bihar.svg/1200px-Seal_of_Bihar.svg.png",
    category: "State",
    state: "Bihar",
  },
  {
    id: "br-kanya-suraksha-yojana",
    name: "Mukhyamantri Kanya Suraksha Yojana",
    description: "Health and financial security for girls including immunization benefits.",
    eligibility: "Girl child born to BPL families in Bihar.",
    documents: ["Birth Certificate", "BPL Card", "Parent's Aadhaar Card"],
    link: "https://socialwelfare.bihar.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Seal_of_Bihar.svg/1200px-Seal_of_Bihar.svg.png",
    category: "State",
    state: "Bihar",
  },

  // Chhattisgarh
  {
    id: "cg-drmkpjy",
    name: "Dr. Khubchand Baghel Swasthya Sahayata Yojana",
    description: "Cashless healthcare for families, covering up to ₹5 lakhs per family.",
    eligibility: "All families in Chhattisgarh with Smart Card.",
    documents: ["Smart Card", "Aadhaar Card", "Residence Proof"],
    link: "https://health.cg.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Great_Seal_of_Chhattisgarh.png",
    category: "State",
    state: "Chhattisgarh",
  },
  {
    id: "cg-mmsby",
    name: "Mukhyamantri Swasthya Bima Yojana",
    description: "Comprehensive health insurance for all families in Chhattisgarh.",
    eligibility: "All residents of Chhattisgarh.",
    documents: ["Smart Card", "Aadhaar Card"],
    link: "https://health.cg.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Great_Seal_of_Chhattisgarh.png",
    category: "State",
    state: "Chhattisgarh",
  },
  {
    id: "cg-sanjeevani",
    name: "Sanjeevani Sahayata Kosh",
    description: "Financial assistance for treatment of serious diseases not covered under other schemes.",
    eligibility: "BPL families requiring treatment for serious illnesses.",
    documents: ["BPL Card", "Medical Certificate", "Treatment Estimate"],
    link: "https://health.cg.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Great_Seal_of_Chhattisgarh.png",
    category: "State",
    state: "Chhattisgarh",
  },

  // Goa
  {
    id: "ga-ddssy",
    name: "Deen Dayal Swasthya Seva Yojana (DDSSY)",
    description: "Comprehensive health insurance covering up to ₹4 lakhs per family.",
    eligibility: "Residents of Goa for at least 5 years.",
    documents: ["Residence Certificate", "Aadhaar Card", "Passport Size Photos"],
    link: "https://www.ddssy.goa.gov.in/",
    image: "https://www.ddssy.goa.gov.in/images/logo_1.png",
    category: "State",
    state: "Goa",
  },
  {
    id: "ga-mediclaim",
    name: "Goa Mediclaim Scheme",
    description: "Medical insurance for government employees and their families.",
    eligibility: "Government employees of Goa.",
    documents: ["Government ID", "Aadhaar Card", "Family Details"],
    link: "https://dhsgoa.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/80/Seal_of_Goa.svg",
    category: "State",
    state: "Goa",
  },
  {
    id: "ga-gramin-scheme",
    name: "Gramin Healthcare Scheme",
    description: "Healthcare services in rural areas of Goa.",
    eligibility: "Residents of rural areas in Goa.",
    documents: ["Residence Proof", "Aadhaar Card"],
    link: "https://dhsgoa.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/80/Seal_of_Goa.svg",
    category: "State",
    state: "Goa",
  },

  // Gujarat
  {
    id: "gj-maacard",
    name: "Mukhyamantri Amrutam MA Vatsalya Yojana",
    description: "Cashless medical and surgical treatment up to ₹5 lakhs per family.",
    eligibility: "Families with annual income up to ₹4 lakhs.",
    documents: ["Income Certificate", "Aadhaar Card", "MA Card"],
    link: "https://magujarat.com/",
    image: "https://magujarat.com/wp-content/uploads/2021/03/ma-amrutam-yojana-logo.png",
    category: "State",
    state: "Gujarat",
  },
  {
    id: "gj-chiranjeevi",
    name: "Chiranjeevi Yojana",
    description: "Maternal and child healthcare scheme for BPL families.",
    eligibility: "BPL pregnant women in Gujarat.",
    documents: ["BPL Card", "Aadhaar Card", "ANC Card"],
    link: "https://gujhealth.gujarat.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Emblem_of_Gujarat.svg/1200px-Emblem_of_Gujarat.svg.png",
    category: "State",
    state: "Gujarat",
  },
  {
    id: "gj-bal-sakha",
    name: "Bal Sakha Yojana",
    description: "Free treatment for newborns requiring critical care.",
    eligibility: "Newborns up to 1 year requiring intensive care.",
    documents: ["Birth Certificate", "Parent's Identity Proof", "Hospital Referral"],
    link: "https://gujhealth.gujarat.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Emblem_of_Gujarat.svg/1200px-Emblem_of_Gujarat.svg.png",
    category: "State",
    state: "Gujarat",
  },

  // Haryana
  {
    id: "hr-chirayu",
    name: "Chirayu Haryana Ayushman Bharat Yojana",
    description: "Extension of Ayushman Bharat providing health coverage up to ₹5 lakhs.",
    eligibility: "Families with annual income less than ₹1.80 lakhs.",
    documents: ["Income Certificate", "Aadhaar Card", "Parivar Pehchan Patra"],
    link: "https://haryanaayushman.gov.in/",
    image: "https://haryanaayushman.gov.in/images/favicon.ico",
    category: "State",
    state: "Haryana",
  },
  {
    id: "hr-mmsby",
    name: "Mukhyamantri Swasthya Bima Yojana",
    description: "Health insurance for BPL families and families with annual income less than ₹3 lakhs.",
    eligibility: "BPL families and low-income families.",
    documents: ["Income Certificate", "Aadhaar Card", "Residence Proof"],
    link: "https://haryanahealth.nic.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Seal_of_Haryana.png",
    category: "State",
    state: "Haryana",
  },
  {
    id: "hr-jssk",
    name: "Janani Shishu Suraksha Karyakram",
    description: "Free and cashless deliveries in public health institutions.",
    eligibility: "All pregnant women delivering in public health institutions.",
    documents: ["Aadhaar Card", "ANC Card"],
    link: "https://haryanahealth.nic.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Seal_of_Haryana.png",
    category: "State",
    state: "Haryana",
  },

  // Himachal Pradesh
  {
    id: "hp-himcare",
    name: "HIMCARE (Himachal Pradesh Cashless Treatment)",
    description: "Cashless treatment up to ₹5 lakhs per year per family.",
    eligibility: "Residents of Himachal Pradesh not covered under Ayushman Bharat.",
    documents: ["Aadhaar Card", "Himachal Pradesh Resident Certificate", "Family ID"],
    link: "https://himcare.hp.gov.in/",
    image: "https://himcare.hp.gov.in/img/footer_logo.png",
    category: "State",
    state: "Himachal Pradesh",
  },
  {
    id: "hp-sahara",
    name: "Sahara Scheme",
    description: "Financial assistance for chronic diseases to BPL families.",
    eligibility: "BPL patients suffering from chronic diseases.",
    documents: ["BPL Certificate", "Medical Certificate", "Aadhaar Card"],
    link: "https://hphealth.nic.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Seal_of_Himachal_Pradesh.svg",
    category: "State",
    state: "Himachal Pradesh",
  },
  {
    id: "hp-mukhyamantri-state-health-care",
    name: "Mukhyamantri State Health Care Scheme",
    description: "Health insurance for state government employees and pensioners.",
    eligibility: "State government employees and pensioners.",
    documents: ["Government ID", "Aadhaar Card", "Service Certificate"],
    link: "https://hphealth.nic.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Seal_of_Himachal_Pradesh.svg",
    category: "State",
    state: "Himachal Pradesh",
  },

  // Jharkhand
  {
    id: "jh-mukhyamantri-gambhir-bimari",
    name: "Mukhyamantri Gambhir Bimari Yojana",
    description: "Financial assistance up to ₹5 lakhs for treatment of serious illnesses.",
    eligibility: "BPL families in Jharkhand.",
    documents: ["BPL Card", "Aadhaar Card", "Medical Reports"],
    link: "https://jharkhand.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Emblem_of_Jharkhand.svg/1200px-Emblem_of_Jharkhand.svg.png",
    category: "State",
    state: "Jharkhand",
  },
  {
    id: "jh-ayushman-bharat-mmjay",
    name: "Ayushman Bharat - Mukya Mantri Jan Arogya Yojana",
    description: "Extension of Ayushman Bharat providing health coverage up to ₹5 lakhs per family.",
    eligibility: "Eligible families as per SECC database.",
    documents: ["Aadhaar Card", "SECC Verification", "Ration Card"],
    link: "https://jhar.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Emblem_of_Jharkhand.svg/1200px-Emblem_of_Jharkhand.svg.png",
    category: "State",
    state: "Jharkhand",
  },
  {
    id: "jh-manav-seva",
    name: "Manav Seva Scheme",
    description: "Financial assistance for treatment of poor patients.",
    eligibility: "Poor patients requiring specialized treatment.",
    documents: ["Income Certificate", "Medical Certificate", "Residence Proof"],
    link: "https://jharkhand.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Emblem_of_Jharkhand.svg/1200px-Emblem_of_Jharkhand.svg.png",
    category: "State",
    state: "Jharkhand",
  },

  // Karnataka
  {
    id: "ka-arogya-karnataka",
    name: "Arogya Karnataka Scheme",
    description: "Universal healthcare scheme providing treatment up to ₹5 lakhs per year.",
    eligibility: "All residents of Karnataka.",
    documents: ["Aadhaar Card", "BPL Card (if applicable)", "Voter ID"],
    link: "https://arogya.karnataka.gov.in/",
    image: "https://arogya.karnataka.gov.in/WriteReadData/GBXMLFiles/Photos/arogya_karnataka_logo.png",
    category: "State",
    state: "Karnataka",
  },
  {
    id: "ka-vajpayee-arogyashree",
    name: "Vajpayee Arogyashree Scheme",
    description: "Health insurance scheme for BPL families in Karnataka.",
    eligibility: "BPL families requiring tertiary care.",
    documents: ["BPL Card", "Aadhaar Card", "Medical Referral"],
    link: "https://karhfw.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Seal_of_Karnataka.svg",
    category: "State",
    state: "Karnataka",
  },
  {
    id: "ka-jyothi-sanjeevini",
    name: "Jyothi Sanjeevini Scheme",
    description: "Health insurance for state government employees.",
    eligibility: "State government employees and their dependents.",
    documents: ["Service ID", "Aadhaar Card", "Family Details"],
    link: "https://karhfw.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Seal_of_Karnataka.svg",
    category: "State",
    state: "Karnataka",
  },

  // Kerala
  {
    id: "kl-karunya-health",
    name: "Karunya Health Scheme",
    description: "Financial assistance for treatment of major diseases.",
    eligibility: "BPL families and financially weak APL families.",
    documents: ["Ration Card", "Income Certificate", "Medical Certificate"],
    link: "https://kerala.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Emblem_of_Kerala.svg",
    category: "State",
    state: "Kerala",
  },
  {
    id: "kl-sneha-sparsham",
    name: "Sneha Sparsham",
    description: "Free treatment for endosulfan victims in Kasaragod district.",
    eligibility: "Endosulfan victims identified by the government.",
    documents: ["Government Identification Certificate", "Aadhaar Card"],
    link: "https://health.kerala.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Emblem_of_Kerala.svg",
    category: "State",
    state: "Kerala",
  },
  {
    id: "kl-chis-plus",
    name: "Comprehensive Health Insurance Scheme (CHIS Plus)",
    description: "Health insurance for families above poverty line.",
    eligibility: "APL families with annual income below ₹3 lakhs.",
    documents: ["Income Certificate", "Aadhaar Card", "Ration Card"],
    link: "https://health.kerala.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Emblem_of_Kerala.svg",
    category: "State",
    state: "Kerala",
  },

  // Madhya Pradesh
  {
    id: "mp-ayushman-niramayam",
    name: "Ayushman Niramayam Madhya Pradesh",
    description: "Extension of Ayushman Bharat covering all residents of MP.",
    eligibility: "All families in Madhya Pradesh.",
    documents: ["Samagra ID", "Aadhaar Card", "Voter ID"],
    link: "https://health.mp.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Emblem_of_Madhya_Pradesh.svg/1200px-Emblem_of_Madhya_Pradesh.svg.png",
    category: "State",
    state: "Madhya Pradesh",
  },
  {
    id: "mp-deendayal-antyodaya",
    name: "Deendayal Antyodaya Upchar Yojana",
    description: "Free treatment up to ₹20,000 for BPL families.",
    eligibility: "BPL families in Madhya Pradesh.",
    documents: ["BPL Card", "Aadhaar Card", "Medical Certificate"],
    link: "https://health.mp.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Emblem_of_Madhya_Pradesh.svg/1200px-Emblem_of_Madhya_Pradesh.svg.png",
    category: "State",
    state: "Madhya Pradesh",
  },
  {
    id: "mp-bal-heart",
    name: "Bal Hriday Upchar Yojana",
    description: "Free treatment for children with congenital heart disease.",
    eligibility: "Children up to 18 years with heart ailments.",
    documents: ["Birth Certificate", "Medical Reports", "Parent's ID Proof"],
    link: "https://health.mp.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Emblem_of_Madhya_Pradesh.svg/1200px-Emblem_of_Madhya_Pradesh.svg.png",
    category: "State",
    state: "Madhya Pradesh",
  },

  // Maharashtra
  {
    id: "mh-mjpjay",
    name: "Mahatma Jyotiba Phule Jan Arogya Yojana (MJPJAY)",
    description: "Cashless treatment for BPL families in Maharashtra.",
    eligibility: "Residents of Maharashtra under BPL category.",
    documents: ["Yellow Ration Card", "Aadhaar Card"],
    link: "https://www.jeevandayee.gov.in/",
    image: "https://www.jeevandayee.gov.in/SiteImages/logo.png",
    category: "State",
    state: "Maharashtra",
  },
  {
    id: "mh-rajiv-gandhi",
    name: "Rajiv Gandhi Jeevandayee Arogya Yojana",
    description: "Health insurance scheme for BPL and APL families.",
    eligibility: "Families with annual income below ₹1 lakh.",
    documents: ["Income Certificate", "Aadhaar Card", "Orange/Yellow Ration Card"],
    link: "https://www.jeevandayee.gov.in/",
    image: "https://www.jeevandayee.gov.in/SiteImages/logo.png",
    category: "State",
    state: "Maharashtra",
  },
  {
    id: "mh-pmvvy",
    name: "Pradhan Mantri Vaya Vandana Yojana - Maharashtra",
    description: "Special healthcare scheme for senior citizens.",
    eligibility: "Senior citizens aged 60 years and above.",
    documents: ["Age Proof", "Aadhaar Card", "Address Proof"],
    link: "https://arogya.maharashtra.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Seal_of_Maharashtra.svg",
    category: "State",
    state: "Maharashtra",
  },

  // Manipur
  {
    id: "mn-cmht",
    name: "Chief Minister's Hakshel-gi Tengbang (CMHT)",
    description: "Health insurance for poor and vulnerable families up to ₹2 lakhs per family.",
    eligibility: "Families with annual income below ₹1.5 lakhs.",
    documents: ["Income Certificate", "Aadhaar Card", "CMHT Card"],
    link: "https://cmht.manipur.gov.in/",
    image: "https://cmht.manipur.gov.in/static/images/cmhtlogo.png",
    category: "State",
    state: "Manipur",
  },
  {
    id: "mn-manipur-health-scheme",
    name: "Manipur State Illness Assistance Fund",
    description: "Financial assistance for treatment of major illnesses.",
    eligibility: "Poor patients requiring expensive treatment.",
    documents: ["BPL Card/Income Certificate", "Medical Certificate", "Aadhaar Card"],
    link: "https://manipur.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Emblem_of_Manipur.svg/1200px-Emblem_of_Manipur.svg.png",
    category: "State",
    state: "Manipur",
  },
  {
    id: "mn-tribal-health",
    name: "Tribal Health Insurance Scheme",
    description: "Health insurance scheme for tribal populations in Manipur.",
    eligibility: "Members of scheduled tribes in Manipur.",
    documents: ["Tribal Certificate", "Aadhaar Card", "Residence Proof"],
    link: "https://manipur.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Emblem_of_Manipur.svg/1200px-Emblem_of_Manipur.svg.png",
    category: "State",
    state: "Manipur",
  },

  // Meghalaya
  {
    id: "ml-mhis",
    name: "Meghalaya Health Insurance Scheme (MHIS)",
    description: "Universal health insurance covering up to ₹5 lakhs per family.",
    eligibility: "All residents of Meghalaya.",
    documents: ["Aadhaar Card/EPIC", "MHIS Card", "Residence Proof"],
    link: "https://meghealth.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Seal_of_Meghalaya.svg/1200px-Seal_of_Meghalaya.svg.png",
    category: "State",
    state: "Meghalaya",
  },
  {
    id: "ml-maternal-child-health",
    name: "Meghalaya Maternal and Child Health Scheme",
    description: "Healthcare for pregnant women and children up to 5 years.",
    eligibility: "Pregnant women and children under 5 years.",
    documents: ["Aadhaar Card", "ANC Card", "Birth Certificate (for children)"],
    link: "https://meghealth.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Seal_of_Meghalaya.svg/1200px-Seal_of_Meghalaya.svg.png",
    category: "State",
    state: "Meghalaya",
  },
  {
    id: "ml-cm-cancer-fund",
    name: "Chief Minister's Cancer Fund",
    description: "Financial assistance for cancer patients.",
    eligibility: "Cancer patients requiring treatment.",
    documents: ["Medical Certificate", "Income Certificate", "Aadhaar Card"],
    link: "https://meghealth.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Seal_of_Meghalaya.svg/1200px-Seal_of_Meghalaya.svg.png",
    category: "State",
    state: "Meghalaya",
  },

  // Mizoram
  {
    id: "mz-hcap",
    name: "Healthcare Accessibility Program (HCAP)",
    description: "Comprehensive health insurance for Mizoram residents.",
    eligibility: "All residents of Mizoram.",
    documents: ["Aadhaar Card", "Voter ID", "Residence Certificate"],
    link: "https://health.mizoram.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Emblem_of_Mizoram.png",
    category: "State",
    state: "Mizoram",
  },
  {
    id: "mz-mmaby",
    name: "Mizoram Medical Assistance Board Yojana",
    description: "Financial assistance for treatment outside the state.",
    eligibility: "Residents requiring specialized treatment outside Mizoram.",
    documents: ["Medical Referral", "Aadhaar Card", "Income Certificate"],
    link: "https://health.mizoram.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Emblem_of_Mizoram.png",
    category: "State",
    state: "Mizoram",
  },
  {
    id: "mz-state-cancer-fund",
    name: "Mizoram State Cancer Fund",
    description: "Financial assistance for cancer patients.",
    eligibility: "Cancer patients from Mizoram.",
    documents: ["Medical Certificate", "Aadhaar Card", "Residence Proof"],
    link: "https://health.mizoram.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Emblem_of_Mizoram.png",
    category: "State",
    state: "Mizoram",
  },

  // Nagaland
  {
    id: "nl-cmhis",
    name: "Chief Minister's Health Insurance Scheme",
    description: "Health insurance for families in Nagaland up to ₹3 lakhs per family.",
    eligibility: "All families in Nagaland.",
    documents: ["Aadhaar Card", "Family ID", "Voter ID"],
    link: "https://nagaland.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Emblem_of_Nagaland.svg/1200px-Emblem_of_Nagaland.svg.png",
    category: "State",
    state: "Nagaland",
  },
  {
    id: "nl-senior-citizen-scheme",
    name: "Nagaland Senior Citizen Healthcare Scheme",
    description: "Free healthcare services for senior citizens.",
    eligibility: "Senior citizens aged 60 years and above.",
    documents: ["Age Proof", "Aadhaar Card", "Residence Certificate"],
    link: "https://health.nagaland.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Emblem_of_Nagaland.svg/1200px-Emblem_of_Nagaland.svg.png",
    category: "State",
    state: "Nagaland",
  },
  {
    id: "nl-tribal-health-program",
    name: "Tribal Health Program",
    description: "Healthcare services for tribal populations in remote areas.",
    eligibility: "Tribal communities in Nagaland.",
    documents: ["Tribal Certificate", "Aadhaar Card"],
    link: "https://health.nagaland.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Emblem_of_Nagaland.svg/1200px-Emblem_of_Nagaland.svg.png",
    category: "State",
    state: "Nagaland",
  },

  // Odisha
  {
    id: "od-bsky",
    name: "Biju Swasthya Kalyan Yojana (BSKY)",
    description: "Universal healthcare with coverage up to ₹5 lakhs per family.",
    eligibility: "All residents of Odisha.",
    documents: ["BSKY Card", "Aadhaar Card", "NFSA/SFSS Card (if applicable)"],
    link: "https://health.odisha.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Seal_of_Odisha.svg/1200px-Seal_of_Odisha.svg.png",
    category: "State",
    state: "Odisha",
  },
  {
    id: "od-cmrf",
    name: "Chief Minister's Relief Fund",
    description: "Financial assistance for treatment of serious illnesses.",
    eligibility: "Patients requiring costly treatment.",
    documents: ["Income Certificate", "Medical Reports", "Aadhaar Card"],
    link: "https://cmrfodisha.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Seal_of_Odisha.svg/1200px-Seal_of_Odisha.svg.png",
    category: "State",
    state: "Odisha",
  },
  {
    id: "od-niramaya",
    name: "Niramaya Scheme",
    description: "Free medicine distribution scheme for all patients in public health facilities.",
    eligibility: "All patients visiting government hospitals.",
    documents: ["Prescription from Government Hospital"],
    link: "https://health.odisha.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Seal_of_Odisha.svg/1200px-Seal_of_Odisha.svg.png",
    category: "State",
    state: "Odisha",
  },

  // Punjab
  {
    id: "pb-sarbat-sehat",
    name: "Sarbat Sehat Bima Yojana",
    description: "Health insurance scheme covering up to ₹5 lakhs per family.",
    eligibility: "All families in Punjab.",
    documents: ["Aadhaar Card", "Family ID Card", "Residence Proof"],
    link: "https://sha.punjab.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Seal_of_Punjab.svg",
    category: "State",
    state: "Punjab",
  },
  {
    id: "pb-cancer-raahat",
    name: "Mukh Mantri Punjab Cancer Raahat Kosh Scheme",
    description: "Financial assistance up to ₹1.5 lakhs for cancer patients.",
    eligibility: "Cancer patients of Punjab.",
    documents: ["Medical Certificate", "Income Certificate", "Aadhaar Card"],
    link: "https://health.punjab.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Seal_of_Punjab.svg",
    category: "State",
    state: "Punjab",
  },
  {
    id: "pb-mata-kaushalya",
    name: "Mata Kaushalya Kalyan Scheme",
    description: "Cash incentives for institutional deliveries for pregnant women.",
    eligibility: "Pregnant women who deliver in government hospitals.",
    documents: ["Aadhaar Card", "ANC Card", "Bank Account Details"],
    link: "https://health.punjab.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Seal_of_Punjab.svg",
    category: "State",
    state: "Punjab",
  },

  // Rajasthan
  {
    id: "rj-chiranjeevi",
    name: "Mukhyamantri Chiranjeevi Swasthya Bima Yojana",
    description: "Health insurance scheme covering up to ₹10 lakhs per family per year.",
    eligibility: "All families of Rajasthan.",
    documents: ["Jan Aadhaar Card", "Aadhaar Card", "Mobile Number"],
    link: "https://chiranjeevi.rajasthan.gov.in/",
    image: "https://chiranjeevi.rajasthan.gov.in/assets/images/chiranji.png",
    category: "State",
    state: "Rajasthan",
  },
  {
    id: "rj-cmrf",
    name: "Chief Minister's Relief Fund - Medical",
    description: "Financial assistance for serious illnesses.",
    eligibility: "Patients requiring treatment for serious diseases.",
    documents: ["Medical Certificate", "Income Certificate", "Aadhaar Card"],
    link: "https://cmrelief.rajasthan.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Emblem_of_Rajasthan.svg/1200px-Emblem_of_Rajasthan.svg.png",
    category: "State",
    state: "Rajasthan",
  },
  {
    id: "rj-rajshree",
    name: "Rajshree Yojana",
    description: "Financial support for girl child including healthcare benefits.",
    eligibility: "Girl child born in Rajasthan.",
    documents: ["Birth Certificate", "Aadhaar Card of Parents", "Bank Account Details"],
    link: "https://wcd.rajasthan.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Emblem_of_Rajasthan.svg/1200px-Emblem_of_Rajasthan.svg.png",
    category: "State",
    state: "Rajasthan",
  },

  // Sikkim
  {
    id: "sk-cmrhfs",
    name: "Chief Minister's Rural Healthcare Fund Scheme",
    description: "Financial assistance for healthcare in rural areas.",
    eligibility: "Residents of rural areas in Sikkim.",
    documents: ["Sikkim Subject Certificate/COI", "Aadhaar Card", "BPL Card (if applicable)"],
    link: "https://www.sikkimhealth.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Emblem_of_Sikkim.svg/1200px-Emblem_of_Sikkim.svg.png",
    category: "State",
    state: "Sikkim",
  },
  {
    id: "sk-fmchs",
    name: "Free Medical Care Health Scheme",
    description: "Free medical treatment for BPL families.",
    eligibility: "BPL families in Sikkim.",
    documents: ["BPL Certificate", "Aadhaar Card", "Sikkim Subject Certificate/COI"],
    link: "https://www.sikkimhealth.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Emblem_of_Sikkim.svg/1200px-Emblem_of_Sikkim.svg.png",
    category: "State",
    state: "Sikkim",
  },
  {
    id: "sk-mahala-swasthya",
    name: "Mahila Swasthya Yojana",
    description: "Healthcare services for women including maternal healthcare.",
    eligibility: "Women residents of Sikkim.",
    documents: ["Aadhaar Card", "Sikkim Subject Certificate/COI"],
    link: "https://www.sikkimhealth.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Emblem_of_Sikkim.svg/1200px-Emblem_of_Sikkim.svg.png",
    category: "State",
    state: "Sikkim",
  },

  // Tamil Nadu
  {
    id: "tn-cmchs",
    name: "Chief Minister's Comprehensive Health Insurance Scheme (Tamil Nadu)",
    description: "Free quality medical care to low-income families in Tamil Nadu.",
    eligibility: "Annual income below ₹1,20,000.",
    documents: ["Income Certificate", "Ration Card", "Aadhaar Card"],
    link: "https://www.cmchistn.com/",
    image: "https://www.cmchistn.com/images/logo.png",
    category: "State",
    state: "Tamil Nadu",
  },
  {
    id: "tn-varumun-kappom",
    name: "Varumun Kappom Scheme",
    description: "Preventive healthcare services through medical camps.",
    eligibility: "All residents of Tamil Nadu.",
    documents: ["Aadhaar Card"],
    link: "https://www.tnhealth.tn.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/81/Emblem_of_Tamil_Nadu.svg",
    category: "State",
    state: "Tamil Nadu",
  },
  {
    id: "tn-dr-muthulakshmi",
    name: "Dr. Muthulakshmi Reddy Maternity Benefit Scheme",
    description: "Financial assistance and healthcare for pregnant women.",
    eligibility: "Pregnant women with annual family income below ₹72,000.",
    documents: ["Income Certificate", "ANC Card", "Aadhaar Card"],
    link: "https://www.tnhealth.tn.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/81/Emblem_of_Tamil_Nadu.svg",
    category: "State",
    state: "Tamil Nadu",
  },

  // Telangana
  {
    id: "tg-aarogyasri",
    name: "Aarogyasri Health Care Trust",
    description: "Free healthcare up to ₹5 lakhs for BPL families.",
    eligibility: "BPL families in Telangana.",
    documents: ["Food Security Card", "Aadhaar Card"],
    link: "https://www.aarogyasri.telangana.gov.in/",
    image: "https://www.aarogyasri.telangana.gov.in/images/arogya_logo.png",
    category: "State",
    state: "Telangana",
  },
  {
    id: "tg-employee-health",
    name: "Employees Health Scheme",
    description: "Cashless healthcare for state government employees and pensioners.",
    eligibility: "State government employees and pensioners.",
    documents: ["Service ID", "Aadhaar Card", "Family Details"],
    link: "https://ehf.telangana.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Telangana_Logo.svg/1200px-Telangana_Logo.svg.png",
    category: "State",
    state: "Telangana",
  },
  {
    id: "tg-kanti-velugu",
    name: "Kanti Velugu Scheme",
    description: "Universal eye care program with free eye check-ups and treatments.",
    eligibility: "All residents of Telangana.",
    documents: ["Aadhaar Card"],
    link: "https://health.telangana.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Telangana_Logo.svg/1200px-Telangana_Logo.svg.png",
    category: "State",
    state: "Telangana",
  },

  // Tripura
  {
    id: "tr-tschis",
    name: "Tripura State Comprehensive Health Insurance Scheme",
    description: "Health insurance scheme for all residents of Tripura.",
    eligibility: "All families of Tripura.",
    documents: ["Aadhaar Card", "Ration Card", "Residence Certificate"],
    link: "https://tripuranrhm.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Emblem_of_Tripura.svg/1200px-Emblem_of_Tripura.svg.png",
    category: "State",
    state: "Tripura",
  },
  {
    id: "tr-maternity-benefit",
    name: "Maternity Benefit Programme",
    description: "Cash assistance and healthcare for pregnant women and lactating mothers.",
    eligibility: "Pregnant women and lactating mothers.",
    documents: ["Aadhaar Card", "ANC Card", "Bank Account Details"],
    link: "https://health.tripura.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Emblem_of_Tripura.svg/1200px-Emblem_of_Tripura.svg.png",
    category: "State",
    state: "Tripura",
  },
  {
    id: "tr-cmrf",
    name: "Chief Minister's Relief Fund - Health",
    description: "Financial assistance for treatment of serious illnesses.",
    eligibility: "Patients requiring costly treatment.",
    documents: ["Medical Certificate", "Income Certificate", "Aadhaar Card"],
    link: "https://tripura.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Emblem_of_Tripura.svg/1200px-Emblem_of_Tripura.svg.png",
    category: "State",
    state: "Tripura",
  },

  // Uttar Pradesh
  {
    id: "up-mmsby",
    name: "Mukhyamantri Jan Arogya Abhiyan",
    description: "Health coverage up to ₹5 lakhs per year for families not covered under Ayushman Bharat.",
    eligibility: "Families not eligible under Ayushman Bharat.",
    documents: ["Aadhaar Card", "Income Certificate", "Ration Card"],
    link: "https://www.upmjay.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Seal_of_Uttar_Pradesh.svg/1200px-Seal_of_Uttar_Pradesh.svg.png",
    category: "State",
    state: "Uttar Pradesh",
  },
  {
    id: "up-mcrf",
    name: "Mukhyamantri Chikit Relief Fund",
    description: "Financial assistance for treatment of serious illnesses.",
    eligibility: "Patients requiring costly treatment.",
    documents: ["Medical Certificate", "Income Certificate", "Aadhaar Card"],
    link: "https://uphealth.up.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Seal_of_Uttar_Pradesh.svg/1200px-Seal_of_Uttar_Pradesh.svg.png",
    category: "State",
    state: "Uttar Pradesh",
  },
  {
    id: "up-jssk",
    name: "Janani Shishu Suraksha Karyakram",
    description: "Free and cashless services for pregnant women and sick newborns.",
    eligibility: "Pregnant women and newborns up to 30 days after birth.",
    documents: ["ANC Card", "Aadhaar Card"],
    link: "https://uphealth.up.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Seal_of_Uttar_Pradesh.svg/1200px-Seal_of_Uttar_Pradesh.svg.png",
    category: "State",
    state: "Uttar Pradesh",
  },

  // Uttarakhand
  {
    id: "uk-atal-ayushman",
    name: "Atal Ayushman Uttarakhand Yojana",
    description: "Health insurance scheme covering up to ₹5 lakhs per family annually.",
    eligibility: "All residents of Uttarakhand.",
    documents: ["Aadhaar Card", "Ration Card", "Residence Certificate"],
    link: "https://ukhfws.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/28/Emblem_of_Uttarakhand.svg",
    category: "State",
    state: "Uttarakhand",
  },
  {
    id: "uk-mrmf",
    name: "Mukhyamantri Rahat Kosh",
    description: "Financial assistance for treatment of serious illnesses.",
    eligibility: "Patients requiring expensive treatment.",
    documents: ["Medical Certificate", "Income Certificate", "Aadhaar Card"],
    link: "https://health.uk.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/28/Emblem_of_Uttarakhand.svg",
    category: "State",
    state: "Uttarakhand",
  },
  {
    id: "uk-mmjsy",
    name: "Mukhyamantri Swasthya Beema Yojana",
    description: "Health insurance for state government employees.",
    eligibility: "State government employees and their dependents.",
    documents: ["Government ID", "Aadhaar Card", "Family Details"],
    link: "https://health.uk.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/28/Emblem_of_Uttarakhand.svg",
    category: "State",
    state: "Uttarakhand",
  },

  // West Bengal
  {
    id: "wb-swasthya-sathi",
    name: "Swasthya Sathi Scheme",
    description: "Cashless health insurance up to ₹5 lakhs per family per annum.",
    eligibility: "All families in West Bengal.",
    documents: ["Swasthya Sathi Card", "Aadhaar Card"],
    link: "https://www.wbhealth.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Seal_of_West_Bengal.svg/1200px-Seal_of_West_Bengal.svg.png",
    category: "State",
    state: "West Bengal",
  },
  {
    id: "wb-sishu-sathi",
    name: "Sishu Sathi Scheme",
    description: "Free treatment for children up to 12 years.",
    eligibility: "Children up to 12 years of age.",
    documents: ["Birth Certificate", "Parent's Identity Proof"],
    link: "https://www.wbhealth.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Seal_of_West_Bengal.svg/1200px-Seal_of_West_Bengal.svg.png",
    category: "State",
    state: "West Bengal",
  },
  {
    id: "wb-kanyashree",
    name: "Kanyashree Prakalpa",
    description: "Financial incentives and health benefits for girl children.",
    eligibility: "Unmarried girls aged 13-19 years from families with annual income below ₹1.2 lakhs.",
    documents: ["Age Proof", "Income Certificate", "School Enrollment Certificate"],
    link: "https://wbkanyashree.gov.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Seal_of_West_Bengal.svg/1200px-Seal_of_West_Bengal.svg.png",
    category: "State",
    state: "West Bengal",
  },

  // Delhi
  {
    id: "dl-arogya-kosh",
    name: "Delhi Arogya Kosh",
    description: "Financial support for medical treatment to Delhi residents.",
    eligibility: "Resident of Delhi with income below ₹3 lakhs.",
    documents: ["Address Proof", "Income Certificate", "Medical Documents"],
    link: "https://health.delhigovt.nic.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/59/Government_of_Delhi_Emblem.png",
    category: "State",
    state: "Delhi",
  },
  {
    id: "dl-farishtey",
    name: "Farishtey Dilli Ke",
    description: "Free treatment for road accident victims in all Delhi hospitals.",
    eligibility: "Any road accident victim in Delhi.",
    documents: ["FIR Copy (if available)", "Medical Certificate"],
    link: "https://health.delhigovt.nic.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/59/Government_of_Delhi_Emblem.png",
    category: "State",
    state: "Delhi",
  },
  {
    id: "dl-aamaadmi",
    name: "Aam Aadmi Mohalla Clinics",
    description: "Free primary healthcare services through neighborhood clinics.",
    eligibility: "All residents of Delhi.",
    documents: ["No documents required"],
    link: "https://health.delhigovt.nic.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/59/Government_of_Delhi_Emblem.png",
    category: "State",
    state: "Delhi",
  },

  // Jammu & Kashmir
  {
    id: "jk-sehat",
    name: "SEHAT Scheme",
    description: "Health insurance scheme providing coverage up to ₹5 lakhs per family per year.",
    eligibility: "All residents of Jammu & Kashmir.",
    documents: ["Aadhaar Card", "Ration Card", "Residence Certificate"],
    link: "https://jkhealth.org/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Emblem_of_Jammu_and_Kashmir.svg/1200px-Emblem_of_Jammu_and_Kashmir.svg.png",
    category: "State",
    state: "Jammu and Kashmir",
  },
  {
    id: "jk-balsewa",
    name: "Balsewa Yojana",
    description: "Healthcare for orphaned and destitute children.",
    eligibility: "Orphaned and destitute children up to 18 years.",
    documents: ["Guardian's Identity Proof", "Certificate from Social Welfare Department"],
    link: "https://jkhealth.org/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Emblem_of_Jammu_and_Kashmir.svg/1200px-Emblem_of_Jammu_and_Kashmir.svg.png",
    category: "State",
    state: "Jammu and Kashmir",
  },
  {
    id: "jk-janani-shishu",
    name: "Janani Shishu Suraksha Karyakram",
    description: "Free and cashless services for pregnant women and sick newborns.",
    eligibility: "Pregnant women and newborns.",
    documents: ["ANC Card", "Aadhaar Card"],
    link: "https://jkhealth.org/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Emblem_of_Jammu_and_Kashmir.svg/1200px-Emblem_of_Jammu_and_Kashmir.svg.png",
    category: "State",
    state: "Jammu and Kashmir",
  },

  // Ladakh
  {
    id: "la-umeed",
    name: "Umeed Health Insurance Scheme",
    description: "Health insurance for residents of Ladakh.",
    eligibility: "All residents of Ladakh.",
    documents: ["Aadhaar Card", "Residence Certificate", "Ration Card"],
    link: "https://ladakh.nic.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/68/Emblem_of_Ladakh.png",
    category: "State",
    state: "Ladakh",
  },
  {
    id: "la-maternity-benefit",
    name: "Ladakh Maternity Benefit Scheme",
    description: "Cash assistance and healthcare for pregnant women.",
    eligibility: "Pregnant women of Ladakh.",
    documents: ["ANC Card", "Aadhaar Card", "Bank Account Details"],
    link: "https://ladakh.nic.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/68/Emblem_of_Ladakh.png",
    category: "State",
    state: "Ladakh",
  },
  {
    id: "la-medical-aid",
    name: "Ladakh Medical Aid Fund",
    description: "Financial assistance for treatment outside Ladakh.",
    eligibility: "Patients requiring treatment outside Ladakh.",
    documents: ["Medical Referral", "Income Certificate", "Aadhaar Card"],
    link: "https://ladakh.nic.in/",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/68/Emblem_of_Ladakh.png",
    category: "State",
    state: "Ladakh",
  }
];

const states = [
  "All States", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh"
];

const GovernmentSchemes = () => {
  const [filter, setFilter] = useState<"All" | "State" | "Central">("All");
  const [selectedState, setSelectedState] = useState("All States");
  const [searchQuery, setSearchQuery] = useState("");

  const searchSchemes = (schemes: any[]) => {
    return schemes.filter(scheme => 
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.eligibility.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  // Preload national emblem image to prevent flickering
  useEffect(() => {
    const preloadImages = () => {
      const nationalEmblem = new Image();
      nationalEmblem.src = emblem;
    };
    
    preloadImages();
  }, []);

  const filteredSchemes = schemes.filter((scheme) => {
    const categoryMatch = filter === "All" || scheme.category === filter;
    const stateMatch =
      selectedState === "All States" ||
      (scheme.state && scheme.state === selectedState);
    return categoryMatch && stateMatch;
  });

  return (
    <>
      {/* Embed the styles directly in the component */}
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      {/* No need for external title components */}

      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 animate-fadeIn">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Government Health Schemes
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore central and state government health schemes with eligibility, documents, and links.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-sm mb-10">
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search schemes..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* Filter Buttons */}
            <div className="mb-4">
              <h3 className="text-gray-700 font-medium mb-3 text-sm uppercase tracking-wider">Filter by Category:</h3>
              <div className="flex flex-wrap gap-2">
                {["All", "Central", "State"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat as any)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      filter === cat 
                        ? "bg-cyan-600 text-white border-cyan-600" 
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* State Dropdown */}
            <div>
              <h3 className="text-gray-700 font-medium mb-3 text-sm uppercase tracking-wider">Filter by State:</h3>
              <div className="relative">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full md:w-auto appearance-none bg-white border border-gray-300 px-4 py-2 pr-8 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Scheme Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.length > 0 ? (
              filteredSchemes.map((scheme) => (
                <div
                  key={scheme.id}
                  className="bg-white rounded-2xl shadow p-5 scheme-card flex flex-col h-full"
                >
                  <div className="relative h-40 mb-4 bg-gray-50 rounded overflow-hidden flex items-center justify-center">
                    <div className="w-full h-full flex flex-col items-center justify-center p-4">
                      <div className="emblem-container">
                        {scheme.category === "Central" || !scheme.state ? (
                          <img
                            src="/national-emblem.png"
                            alt="Government of India"
                            className="emblem-image loading"
                            loading="eager"
                            onLoad={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.classList.remove('loading');
                            }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.classList.remove('loading');
                            }}
                          />
                        ) : (
                          <img
                            src={emblem}
                            alt={`Government of ${scheme.state}`}
                            className="emblem-image loading"
                            loading="eager" 
                            onLoad={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.classList.remove('loading');
                            }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = "/national-emblem.png";
                              target.classList.remove('loading');
                            }}
                          />
                        )}
                        <div className="emblem-placeholder">
                          <div className="w-10 h-10 rounded-full bg-gray-200 bg-opacity-80"></div>
                        </div>
                      </div>
                      <div className="mt-2 text-sm font-medium text-gray-600">
                        {scheme.state || "Government of India"}
                      </div>
                    </div>
                    <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                      scheme.category === 'Central' 
                        ? 'bg-cyan-100 text-cyan-800' 
                        : 'bg-indigo-100 text-indigo-800'
                    }`}>
                      {scheme.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-cyan-700 mb-2 line-clamp-2">
                    {scheme.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{scheme.description}</p>
                  
                  <div className="space-y-2 mb-4 flex-grow">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Eligibility:</span> {scheme.eligibility}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Documents:</span> {scheme.documents.join(", ")}
                    </p>
                    {scheme.state && (
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">State:</span> {scheme.state}
                      </p>
                    )}
                  </div>
                  
                  <a
                    href={scheme.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-cyan-600 text-sm font-medium hover:underline mt-auto transition-colors"
                  >
                    Learn more →
                  </a>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-500 text-lg mb-2">No schemes found for the selected filters.</p>
                <p className="text-gray-400 mb-4">Try selecting a different state or category.</p>
                <button 
                  onClick={() => {
                    setFilter("All");
                    setSelectedState("All States");
                  }}
                  className="px-4 py-2 bg-cyan-600 text-white text-sm font-medium rounded-lg hover:bg-cyan-700 transition"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default GovernmentSchemes;
