/* =============================================================
   CAMPUS CYBER SHIELD : MESSAGE BANK
   -------------------------------------------------------------
   Each message is one object in the MESSAGES list.
   To add a message: copy any block, change the text, give it a new id.

   Special marks you can use in  from / subject / body / attachment:
     [[text]]         -> red flag  (turns RED after the player answers)
     [+text+]         -> trust sign (turns GREEN after the player answers)
     {{shown|real}}   -> a link: "shown" is what the reader sees,
                         "real" is where it actually goes
     {name}           -> replaced with the player's name
     {school}         -> replaced with SCHOOL_NAME below

   points = the explanation shown after answering.
     slam: "S" Sender, "L" Link, "A" Attachment, "M" Message
   ============================================================= */

const SCHOOL_NAME = "Velammal Vision, Ponneri";

const MESSAGES = [

  // ------------------------- PHISHING -------------------------

  {
    id: 1,
    title: "Bank 'KYC update' SMS",
    channel: "sms",
    from: "[[+91 81479 20563]]",
    situation: "You have a savings account with SBI and use the YONO app.",
    body: "[[Dear Customer]], your SBI YONO account [[will be BLOCKED today]] due to pending KYC. [[Update your PAN card details immediately]] at [[{{sbi-yono-kyc.co.in/update|http://sbi-yono-kyc.co.in/update}}]]",
    isPhishing: true,
    points: [
      { slam: "S", text: "Sent from an ordinary 10-digit mobile number. Real bank SMS come from a registered sender ID like 'JM-SBIBNK-T', never from a personal number." },
      { slam: "M", text: "'Will be BLOCKED today' creates panic so you act before you think." },
      { slam: "M", text: "Asks for your PAN details through a link. Banks never ask you to complete KYC through an SMS link." },
      { slam: "L", text: "'sbi-yono-kyc.co.in' is not SBI's website. It only contains the letters 'sbi'. Since 2025, RBI has required Indian banks to use web addresses ending in '.bank.in', which only real banks can register." },
      { slam: "M", text: "'Dear Customer': your real bank knows your name." }
    ],
    tip: "Got a KYC or 'account blocked' message? Don't click. Open your bank's official app yourself, or visit the branch."
  },

  {
    id: 2,
    title: "Scholarship 'processing fee' email",
    channel: "email",
    from: "National Scholarship Portal <[[nsp.scholarship2026@gmail.com]]>",
    subject: "[[Congratulations!]] You are selected for ₹50,000 Merit Scholarship",
    situation: "You scored well in your Class 10 board exams.",
    body: "Dear Student,\n\nBased on your board exam marks, you have been selected for the National Merit Scholarship of ₹50,000.\n\n[[To release the amount, pay a refundable processing fee of ₹499]] through UPI. [[This offer expires in 24 hours.]]\n\n[[{{Click here to claim your scholarship|http://nsp-award-verify.in/pay}}]]\n\nRegards,\nNSP Team",
    isPhishing: true,
    points: [
      { slam: "S", text: "A government scholarship would never be sent from a free Gmail address. Official emails come from addresses ending in .gov.in or .nic.in." },
      { slam: "M", text: "You never applied, but you still 'won'. If it sounds too good to be true, it usually is." },
      { slam: "M", text: "You have to pay money to receive money. Real scholarships never charge a 'processing fee'." },
      { slam: "M", text: "A 24-hour deadline puts pressure on you." },
      { slam: "L", text: "'Click here' hides the real address. It goes to nsp-award-verify.in, not the official scholarships.gov.in." }
    ],
    tip: "Check scholarships only on scholarships.gov.in or with your school office. Never pay a fee to 'unlock' a prize."
  },

  {
    id: 3,
    title: "Friend asking for your OTP",
    channel: "whatsapp",
    from: "Divya (Class 11-B) 🌸",
    situation: "Divya is saved in your contacts. She messages you at 10:45 PM.",
    body: "Heyy sorry to disturb 😅 I was logging in and typed your number by mistake. [[A 6-digit code just came to your phone, can you send it to me?]] [[Pls fast, it's urgent!!]]",
    isPhishing: true,
    points: [
      { slam: "M", text: "It asks for an OTP. The code on YOUR phone is the key to YOUR account. Sending it lets someone else log in to your WhatsApp on their phone." },
      { slam: "S", text: "A saved contact can still be a scammer. When criminals take over one account, they message everyone in that person's contact list." },
      { slam: "M", text: "'Pls fast, urgent!!' rushes you so you don't stop to check." }
    ],
    tip: "Never forward an OTP to anyone, not even friends or family. If a friend asks, call them on a normal phone call first. Also turn on WhatsApp Two-Step Verification."
  },

  {
    id: 4,
    title: "Instagram 'copyright violation' email",
    channel: "email",
    from: "Instagram <security@[[lnstagram-support.com]]>",
    subject: "[[Copyright Violation]] - Action required on your account",
    situation: "You posted a dance reel on Instagram yesterday.",
    body: "[[Hi,]]\n\nWe received a copyright complaint about one of your recent posts. [[If you do not submit an appeal within 24 hours, your account will be permanently deleted.]]\n\nIf you believe this is a mistake, verify your identity and submit an appeal below.\n\n[[{{Appeal Now|https://lnstagram-support.com/appeal/login}}]]\n\nInstagram Security Team",
    isPhishing: true,
    points: [
      { slam: "S", text: "Look closely: 'lnstagram' starts with a small L, not a capital I. It is a fake domain made to look like the real one." },
      { slam: "M", text: "It threatens to delete your account in 24 hours, using fear and urgency together." },
      { slam: "L", text: "'Appeal Now' opens a fake login page that will steal your password." },
      { slam: "M", text: "It only says 'Hi' and never uses your username, because a mass scam email doesn't know it." }
    ],
    tip: "Real warnings also show up inside the Instagram app (Account Status). If the app shows nothing, the email is fake."
  },

  {
    id: 5,
    title: "India Post 'parcel held' SMS",
    channel: "sms",
    from: "[[+63 915 482 7731]]",
    situation: "Your family often orders things online.",
    body: "IndiaPost: [[Your parcel is held at our warehouse due to incomplete address details.]] Please update [[within 12 hours]] or it will be returned: [[{{https://indiapost.gov.in-track.top/in|https://indiapost.gov.in-track.top/in}}]]",
    isPhishing: true,
    points: [
      { slam: "S", text: "India Post does not send SMS from a foreign (+63, Philippines) phone number." },
      { slam: "L", text: "Find the website name (the part between 'https://' and the next '/') and read it from the RIGHT. It ends in 'in-track.top', so that is the real owner. 'indiapost.gov' at the start is only a disguise. The real site is indiapost.gov.in." },
      { slam: "M", text: "A 12-hour deadline, but no tracking number and no parcel details." }
    ],
    tip: "Track parcels only with the tracking number the shop gave you, on the official website or app."
  },

  {
    id: 6,
    title: "'Like videos and earn' job offer",
    channel: "whatsapp",
    from: "[[+44 7418 305962]]",
    situation: "You want to earn some pocket money during the holidays.",
    body: "Hello! I am Riya from [[Amazon HR team]] 😊 We are hiring students for a simple part-time job. [[Just like YouTube videos and earn ₹150 per like. Daily income ₹3,000 - ₹8,000!]] No experience needed.\n\n[[Reply YES and I will add you to our Telegram group.]]",
    isPhishing: true,
    points: [
      { slam: "S", text: "An unknown international (+44) number. Real companies don't hire by sending random WhatsApp messages." },
      { slam: "M", text: "Big money just for liking videos is too good to be true." },
      { slam: "M", text: "It moves you to Telegram. Later they ask you to 'invest' or 'pay a deposit' to unlock bigger tasks, and that money is lost." },
      { slam: "M", text: "It uses a big brand name ('Amazon HR') to look trustworthy." }
    ],
    tip: "Real internships and jobs are on official career pages. Block and report such numbers."
  },

  {
    id: 7,
    title: "'Leaked board paper' APK file",
    channel: "whatsapp",
    from: "Board Exam Help 2027 👑 · [[+91 63820 47159]]",
    situation: "A stranger added you to this WhatsApp group three weeks before your board exams.",
    body: "🔥 [[100% REAL Class 12 Physics board paper LEAKED]] 🔥\nOnly for first 50 students!! Download the file below and [[pay ₹299 on UPI to get the password]]. Share with your friends 👇",
    attachment: "[[Physics_Board_Paper.apk]]",
    isPhishing: true,
    points: [
      { slam: "A", text: "The file ends in .apk. It is an Android APP, not a PDF. If you install it, it can read your SMS (including OTPs), see your contacts and send itself to all of them." },
      { slam: "M", text: "It uses exam stress against you. CBSE has warned many times that 'paper leak' claims on social media are fake." },
      { slam: "M", text: "'Only first 50' plus a payment request means pressure and money." },
      { slam: "S", text: "An unknown number in a group you never chose to join." }
    ],
    tip: "Never install apps from WhatsApp or Telegram files. Install apps only from the Play Store or App Store."
  },

  {
    id: 8,
    title: "Fake school fee email",
    channel: "email",
    from: "Accounts Office, {school} <[[schoolfees.accounts@outlook.com]]>",
    subject: "[[URGENT]]: Pending term fee - hall ticket will be withheld",
    situation: "Term exams start next week.",
    body: "Dear Parent / Student,\n\nDue to our new online system, your Term 2 fee is shown as unpaid. [[Pay ₹12,500 before 6 PM today, otherwise the hall ticket will not be issued.]]\n\nUse the secure payment link below:\n[[{{{school} - Fee Portal|http://school-fee-payment.online/pay}}]]\n\nAccounts Department",
    isPhishing: true,
    points: [
      { slam: "S", text: "The school accounts office would use the official school email or school app, not a free Outlook address." },
      { slam: "M", text: "It threatens to hold back your hall ticket and gives a same-day deadline. That is pure pressure." },
      { slam: "L", text: "The button says '{school} - Fee Portal' but it really goes to 'school-fee-payment.online', an unknown website." }
    ],
    tip: "For any fee message, confirm with the school office or your class teacher. Pay only through the school's official app or at the counter."
  },

  {
    id: 9,
    title: "Electricity 'disconnection tonight' SMS",
    channel: "sms",
    from: "[[+91 90472 18356]]",
    situation: "Your family pays the electricity bill once every two months.",
    body: "[[Dear consumer your electricity power will be disconnected tonight at 9.30 pm]] because [[your previous month bill was not update]]. [[Please immediately contact our electricity officer 9047218356]]. Thank you",
    isPhishing: true,
    points: [
      { slam: "S", text: "Sent from a personal mobile number, not from the electricity board's registered sender ID." },
      { slam: "M", text: "Bad grammar ('bill was not update'). Official messages are checked before they are sent." },
      { slam: "M", text: "Threatening to cut the power 'tonight' is meant to make you panic." },
      { slam: "M", text: "It asks you to call a personal number. The 'officer' will ask you to pay a small amount or install a screen-sharing app, and that is the trap." },
      { slam: "M", text: "It talks about the 'previous month bill', but your family is billed every two months, so the story doesn't match." }
    ],
    tip: "Check your bill only on the official electricity board website or app. Never call numbers given in such SMS."
  },

  {
    id: 10,
    title: "OLX buyer 'enter PIN to receive' scam",
    channel: "whatsapp",
    from: "[[+91 88254 61930]]",
    situation: "You posted your old bicycle for sale on OLX for ₹5,000.",
    body: "Hi, I saw your cycle on OLX. [[I will buy it for full price, no bargaining]] 👍 [[I am in the army and posted outside, so I can't come to see it.]]\n\n[[I am sending ₹5,000 as a UPI request. Just open it and enter your UPI PIN to receive the money.]]",
    isPhishing: true,
    points: [
      { slam: "M", text: "You NEVER enter a UPI PIN to receive money. A PIN is only used to SEND money out of your account." },
      { slam: "M", text: "Paying full price without seeing the item or bargaining is too easy to be real." },
      { slam: "M", text: "Pretending to be in the army is a very common trick to seem trustworthy and to explain why they can't meet." },
      { slam: "S", text: "An unknown number that avoids meeting you or talking on a proper phone call." }
    ],
    tip: "Remember: UPI PIN = paying. Receiving money never needs your PIN, a QR scan or an OTP."
  },

  // ------------------------- GENUINE -------------------------

  {
    id: 11,
    title: "Card payment OTP you asked for",
    channel: "sms",
    from: "[+JM-SBIBNK-T+]",
    situation: "You are buying a book on Amazon and just chose to pay with your SBI debit card.",
    body: "[+OTP for your transaction of Rs. 349.00 at AMAZON+] is 482913. Valid for 3 mins. [+Do not share this OTP with anyone.+] -SBI",
    isPhishing: false,
    points: [
      { slam: "S", text: "Sent from a registered bank sender ID. Under TRAI rules (2025), the '-T' at the end means a transactional/OTP message." },
      { slam: "M", text: "It matches exactly what you just did: the same amount and the same shop." },
      { slam: "M", text: "It tells you NOT to share the OTP. There is no link and it asks for nothing." }
    ],
    tip: "An OTP is safe only when YOU started the action. Type it into the payment page you opened yourself. Never tell it to a person."
  },

  {
    id: 12,
    title: "Google sign-in security alert",
    channel: "email",
    from: "Google <[+no-reply@accounts.google.com+]>",
    subject: "Security alert",
    situation: "You just logged in to your Gmail on a computer in the school lab.",
    body: "A new sign-in on Windows\n\nWe noticed a new sign-in to your Google Account on a Windows device. [+If this was you, you don't need to do anything.+] If not, we'll help you secure your account.\n\n[+{{Check activity|https://myaccount.google.com/notifications}}+]\n\nYou received this email to let you know about important changes to your Google Account and services.",
    isPhishing: false,
    points: [
      { slam: "S", text: "Sent from Google's real domain: accounts.google.com." },
      { slam: "L", text: "If you hover over 'Check activity', you can see it really goes to myaccount.google.com, which is Google's real site." },
      { slam: "M", text: "There are no threats and no password request. It even says 'If this was you, you don't need to do anything.'" },
      { slam: "M", text: "It matches what you just did: you logged in on a new computer." }
    ],
    tip: "Even with real alerts, the safest habit is to open the app or type the website yourself instead of clicking."
  },

  {
    id: 13,
    title: "Class teacher's reminder",
    channel: "whatsapp",
    from: "[+12-A Official Class Group+] · Lakshmi Ma'am",
    situation: "This is the official class group your school created. You saw Lakshmi Ma'am in class today.",
    body: "Good evening students 🙂 [+Reminder: Chemistry practical record must be submitted on Monday+] during the lab period. Those who missed the titration experiment, meet me tomorrow at 1 PM in the staff room.",
    isPhishing: false,
    points: [
      { slam: "S", text: "Sent in the official class group by your class teacher, someone you see every day." },
      { slam: "M", text: "It is about normal school work and matches what was said in class." },
      { slam: "M", text: "There is no link and no attachment, and it doesn't ask for money or personal details." }
    ],
    tip: "Genuine messages usually match things you already know. If a known contact asks for something unusual, confirm in person."
  },

  {
    id: 14,
    title: "DigiLocker marksheet issued",
    channel: "email",
    from: "DigiLocker <[+noreply@digilocker.gov.in+]>",
    subject: "Document issued: Class X Marksheet",
    situation: "Your CBSE Class 10 results were declared recently.",
    body: "Dear {name},\n\nA document has been issued to your DigiLocker account by the Central Board of Secondary Education: [+Class X Marksheet+].\n\n[+You can view it by signing in at {{digilocker.gov.in|https://www.digilocker.gov.in}}+] or in the DigiLocker app.\n\nTeam DigiLocker",
    isPhishing: false,
    points: [
      { slam: "S", text: "Sent from an official .gov.in address. Only Indian government bodies can get a .gov.in domain." },
      { slam: "L", text: "The link text and its real destination are the same site: digilocker.gov.in." },
      { slam: "M", text: "It uses your name and only gives you information. There is no fee, no password request and no deadline." }
    ],
    tip: "Indian government websites end in .gov.in or .nic.in. Anything else claiming to be the government is suspicious."
  },

  {
    id: 15,
    title: "Amazon order shipped",
    channel: "email",
    from: "Amazon.in <[+shipment-tracking@amazon.in+]>",
    subject: "Your Amazon.in order of \"NCERT Exemplar Physics Class 12\" has shipped!",
    situation: "You ordered a Physics book on Amazon two days ago.",
    body: "Hello {name},\n\n[+Your package with \"NCERT Exemplar Physics Class 12\"+] is on its way and will arrive on Thursday.\n\nTrack your package: [+{{Your Orders|https://www.amazon.in/gp/css/order-history}}+]\n\nWe hope to see you again soon.\nAmazon.in",
    isPhishing: false,
    points: [
      { slam: "S", text: "Sent from Amazon's real domain: amazon.in." },
      { slam: "M", text: "It uses your name and matches the book you actually ordered." },
      { slam: "L", text: "'Your Orders' goes to amazon.in, the same site you shop on." },
      { slam: "M", text: "It doesn't ask for a payment, an OTP or a password." }
    ],
    tip: "Still unsure? Don't click. Open the Amazon app and check 'Your Orders' yourself."
  },

  {
    id: 16,
    title: "Money received from Amma",
    channel: "sms",
    from: "[+VM-HDFCBK-S+]",
    situation: "Your mother told you she would send ₹500 for the school trip.",
    body: "[+Rs.500.00 credited to your a/c XX4521+] on 22-09-26 by UPI Ref 625193847261 from MEENA S. Avl Bal Rs.2,340.50 -HDFC Bank",
    isPhishing: false,
    points: [
      { slam: "S", text: "Sent from a registered bank sender ID. The '-S' at the end means a service message." },
      { slam: "M", text: "It matches what you expected: Amma said she would send ₹500." },
      { slam: "M", text: "It only gives information. There's no link, no number to call and no PIN or OTP request, and your account number is hidden (XX4521)." }
    ],
    tip: "A real credit alert only informs you. If a message says you got money but asks you to click, call or enter a PIN, it's a scam."
  },

  {
    id: 17,
    title: "Rain holiday SMS from school",
    channel: "sms",
    from: "[+VM-VELSCH-S+]",
    situation: "It has been raining heavily in Ponneri all day.",
    body: "{school}: As per the District Collector's rain holiday announcement, the school will remain closed tomorrow (Thursday). Classes will resume on Friday. [+Please stay safe indoors.+] - Principal",
    isPhishing: false,
    points: [
      { slam: "S", text: "Sent from the school's registered SMS sender ID, the same one used for every circular." },
      { slam: "M", text: "It's urgent, but it doesn't ask you to DO anything risky: no link, no payment and no personal details. Urgency alone doesn't make a message fake. Urgency plus a demand does." },
      { slam: "M", text: "It matches the real world (heavy rain) and you can check it on the news." }
    ],
    tip: "Ask yourself: 'What does this message want me to DO?' If the answer is nothing risky, it's probably fine."
  },

  {
    id: 18,
    title: "Google Forms response receipt",
    channel: "email",
    from: "Google Forms <[+forms-receipts-noreply@google.com+]>",
    subject: "Your response to \"Gritty Coder '26 - Registration\"",
    situation: "You just submitted the Gritty Coder '26 registration form and ticked 'Send me a copy of my responses'.",
    body: "Thanks for filling out Gritty Coder '26 - Registration\n\nHere's what was received.\n\n[+Name: {name}+]\nTier: Senior (Grades 11-12)\nProblem statement: SC-02 Campus Cyber Shield\n\n[+{{View your response|https://docs.google.com/forms/d/e/gritty-coder-26/viewform}}+]",
    isPhishing: false,
    points: [
      { slam: "S", text: "Sent from google.com, Google's real domain." },
      { slam: "M", text: "It is a copy of the exact form you just filled, with your own answers." },
      { slam: "L", text: "The link goes to docs.google.com, where Google Forms really lives." }
    ],
    tip: "A message that confirms something you just did is usually genuine, but still check the sender and the links."
  }

];
