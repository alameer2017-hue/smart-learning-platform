// src/data/seed.ts
// ALL Arabic text is VERBATIM from source PDFs — DO NOT MODIFY

import type { Lesson, PerfExp, Section, Activity, WorkbookItem, Assessment, Closure, MediaAsset, BotConfig, NgssTags, ScreenDef, ContentBlock, LessonData } from "@/types";

export const ngss: NgssTags[] = [
  { id:"SEP-01", dimension:"SEP", code:"constructing-explanations",  labelEn:"Constructing Explanations",  labelAr:"بناء تفسيرات" },
  { id:"SEP-02", dimension:"SEP", code:"developing-models",          labelEn:"Developing Models",          labelAr:"النمذجة العلمية" },
  { id:"SEP-03", dimension:"SEP", code:"analyzing-data",             labelEn:"Analyzing Data",             labelAr:"تحليل بيانات" },
  { id:"SEP-04", dimension:"SEP", code:"planning-investigations",    labelEn:"Planning Investigations",    labelAr:"تخطيط تحقيقات" },
  { id:"SEP-05", dimension:"SEP", code:"engaging-in-argument",       labelEn:"Engaging in Argument",       labelAr:"الاستدلال والحجج" },
  { id:"CCC-01", dimension:"CCC", code:"cause-and-effect",           labelEn:"Cause and Effect",           labelAr:"السبب والنتيجة" },
  { id:"CCC-02", dimension:"CCC", code:"systems-and-system-models",  labelEn:"Systems and System Models",  labelAr:"الأنظمة ونماذج الأنظمة" },
  { id:"CCC-03", dimension:"CCC", code:"energy-and-matter",          labelEn:"Energy and Matter",          labelAr:"الطاقة والمادة" },
  { id:"DCI-01", dimension:"DCI", code:"PS3.A",                      labelEn:"Definitions of Energy",      labelAr:"تعريف الطاقة" },
  { id:"DCI-02", dimension:"DCI", code:"PS3.B",                      labelEn:"Conservation of Energy",     labelAr:"حفظ الطاقة وانتقالها" },
];

export const lesson: Lesson = {
  id:"L1-1", title:"متى يحدث الشغل؟",
  subtitle:"تحليل العلاقة بين القوة والإزاحة وتأثير الاحتكاك",
  durationMin:45,
  strategies:["التعلم القائم على الاستقصاء","النمذجة العلمية","الحوار السقراطي عبر روبوت الدردشة التعليمي","التعلم القائم على المحاكاة الرقمية"],
  summaryPoints:[
    "الشغل يحدث عندما تؤثر قوة وتُحدث إزاحة في اتجاهها.",
    "لا يحدث شغل علمي إذا لم توجد إزاحة، حتى لو شعر الإنسان بالتعب.",
    "الاحتكاك يعاكس الحركة ويتطلب بذل قوة أكبر.",
    "جزء من الطاقة يتحول إلى طاقة حرارية عند وجود الاحتكاك.",
    "داخل أي نظام يمكن تتبع كيف تؤدي القوة إلى إحداث إزاحة وانتقال للطاقة.",
  ],
};

export const expectations: PerfExp[] = [
  { id:"PE-01", lessonId:"L1-1", orderIdx:1, text:"يبيّن تفسيرًا علميًا يوضح العلاقة بين القوة والإزاحة واتجاه الحركة لتحديد متى يُنجَز شغل على جسم.", ngssTagIds:["SEP-01","CCC-01","DCI-01"] },
  { id:"PE-02", lessonId:"L1-1", orderIdx:2, text:"يستخدم نموذج القوى لتحليل حركة جسم على سطح خشن، موضحًا كيف يؤثر الاحتكاك في مقدار الشغل وانتقال الطاقة.", ngssTagIds:["SEP-02","SEP-03","CCC-02","CCC-03","DCI-02"] },
  { id:"PE-03", lessonId:"L1-1", orderIdx:3, text:"يفسر لماذا يُعد رفع جسم شغلًا علميًا بينما الاحتفاظ به ثابتًا لا يُعد شغلًا، من خلال تحليل حدوث الإزاحة أو عدمها.", ngssTagIds:["SEP-01","SEP-05","CCC-01","DCI-01"] },
];

export const sections: Section[] = [
  { id:"SEC-01", lessonId:"L1-1", orderIdx:1,  phase:"WARMUP",     title:"التهيئة",                   durationMin:5, screenIds:["SCR-01"] },
  { id:"SEC-02", lessonId:"L1-1", orderIdx:2,  phase:"CONTENT",    title:"مفهوم الشغل",               durationMin:5, screenIds:["SCR-02"] },
  { id:"SEC-03", lessonId:"L1-1", orderIdx:3,  phase:"ACTIVITY",   title:"هل أنجزت شغلًا؟",           durationMin:5, screenIds:["SCR-03"] },
  { id:"SEC-04", lessonId:"L1-1", orderIdx:4,  phase:"CONTENT",    title:"اتجاه القوة والحركة",       durationMin:5, screenIds:["SCR-04"] },
  { id:"SEC-05", lessonId:"L1-1", orderIdx:5,  phase:"ACTIVITY",   title:"الاحتكاك... صديق أم عدو؟",  durationMin:5, screenIds:["SCR-05"] },
  { id:"SEC-06", lessonId:"L1-1", orderIdx:6,  phase:"CONTENT",    title:"الاحتكاك وانتقال الطاقة",    durationMin:5, screenIds:["SCR-06"] },
  { id:"SEC-07", lessonId:"L1-1", orderIdx:7,  phase:"ACTIVITY",   title:"رفع أم حمل؟",               durationMin:5, screenIds:["SCR-07"] },
  { id:"SEC-08", lessonId:"L1-1", orderIdx:8,  phase:"ASSESSMENT", title:"التقويم",                    durationMin:5, screenIds:["SCR-08"] },
  { id:"SEC-09", lessonId:"L1-1", orderIdx:9,  phase:"CLOSURE",    title:"الغلق",                     durationMin:4, screenIds:["SCR-09","SCR-10","SCR-11","SCR-12"] },
  { id:"SEC-10", lessonId:"L1-1", orderIdx:10, phase:"SUMMARY",    title:"الملخص",                    durationMin:1, screenIds:["SCR-13"] },
];

export const activities: Activity[] = [
  {
    id:"ACT-01", lessonId:"L1-1", sectionId:"SEC-01", screenId:"SCR-01", orderIdx:1,
    title:"هل كل تعب يُعد شغلًا؟", durationMin:5,
    objectives:["إثارة التعارض المعرفي","الانتقال من الفهم الحياتي إلى الفهم العلمي","تمهيد الطريق لتوقعات الأداء الثلاثة"],
    teacherProcedure:["يعرض المعلم فيديو قصير يتضمن حالتين: شخص يرفع صندوقًا إلى أعلى. شخص يحمل صندوقًا دون حركة لمدة دقيقة.","يطرح الروبوت التعليمي السؤال التالي: في أي حالة تم إنجاز شغل علمي؟ ولماذا؟","يسجل الطالب إجاباتهم داخل المنصة.","يوجّه المعلم الحوار نحو فكرة: العلاقة بين القوة، الإزاحة، اتجاه الحركة."],
    expectedAnswer:"تم إنجاز شغل علمي في حالة رفع الصندوق؛ لأن قوة أثرت على الجسم وحدثت له إزاحة في اتجاه القوة. أما حمل الصندوق دون حركة فلا يُعد شغلًا علميًا؛ لأنه لا توجد إزاحة.",
    mediaIds:["MED-V-01"], ngssTagIds:["SEP-01","CCC-01","DCI-01"],
    botTrigger:"AUTO_AFTER_VIDEO", botQuestion:"في أي حالة تم إنجاز شغل علمي؟ ولماذا؟",
  },
  {
    id:"ACT-02", lessonId:"L1-1", sectionId:"SEC-03", screenId:"SCR-03", orderIdx:2,
    title:"هل أنجزت شغلًا؟", durationMin:5,
    objectives:["أن يحدد الطالب متى يُنجز شغل من خلال تحليل العلاقة بين القوة والإزاحة واتجاه الحركة"],
    teacherProcedure:["اعرض فيديو قصير يتضمن ثلاث حالات: رفع صندوق لأعلى، دفع صندوق بسرعة ثابتة، حمل صندوق دون حركة.","اطلب من الطالب عبر الروبوت: في أي حالة تم إنجاز شغل؟ ولماذا؟","فعّل محاكاة رقمية تُمكّن الطالب من تغيير: مقدار القوة، المسافة، اتجاه القوة.","وجّه الطالب لتحليل: هل توجد إزاحة؟ هل اتجاه القوة موافق للحركة؟","ناقش معهم قاعدة: الشغل يحدث فقط إذا أثرت قوة وأحدثت إزاحة في اتجاهها."],
    expectedAnswer:"يحدث الشغل في حالة رفع الصندوق أو دفعه إذا حدثت إزاحة في اتجاه القوة، ولا يحدث في حالة حمله دون حركة.",
    mediaIds:["MED-V-02","MED-SIM-01"], ngssTagIds:["SEP-03","SEP-01","CCC-01","DCI-01"],
    botTrigger:"AUTO_AFTER_VIDEO", botQuestion:"في أي حالة تم إنجاز شغل؟ ولماذا؟",
  },
  {
    id:"ACT-03", lessonId:"L1-1", sectionId:"SEC-05", screenId:"SCR-05", orderIdx:3,
    title:"الاحتكاك... صديق أم عدو؟", durationMin:5,
    objectives:["أن يحلل الطالب تأثير الاحتكاك في مقدار الشغل وانتقال الطاقة"],
    teacherProcedure:["اعرض فيديو لموقفين: دفع صندوق على سطح أملس، دفع صندوق على سطح خشن.","اطلب من الطالب ملاحظة: أيهما يتطلب قوة أكبر؟","في المحاكاة: يغيّر الطالب معامل الاحتكاك، يراقبون مقدار القوة المطلوبة.","ناقش مفهوم: الاحتكاك يعاكس الحركة، جزء من الطاقة يتحول إلى حرارة.","اطلب منهم تتبع مسار الطاقة داخل النظام."],
    expectedAnswer:"السطح الخشن يتطلب قوة أكبر؛ لأن الاحتكاك فيه أكبر. عند زيادة الاحتكاك نحتاج إلى قوة أكبر، ويتحول جزء من الطاقة إلى طاقة حرارية.",
    expectedExt:{ energy:"الاحتكاك لا يُفني الطاقة، لكنه يحول جزءًا منها إلى حرارة." },
    mediaIds:["MED-V-03","MED-SIM-02"], ngssTagIds:["SEP-03","SEP-02","CCC-03","CCC-02","DCI-02"],
    botTrigger:"ON_DEMAND", botQuestion:"أيهما يتطلب قوة أكبر: السطح الأملس أم الخشن؟ ولماذا؟",
  },
  {
    id:"ACT-04", lessonId:"L1-1", sectionId:"SEC-07", screenId:"SCR-07", orderIdx:4,
    title:"رفع أم حمل؟", durationMin:5,
    objectives:["أن يميز الطالب بين إنجاز الشغل وعدم إنجازه من خلال تحليل وجود الإزاحة"],
    teacherProcedure:["اعرض صورة رياضي يرفع أثقالًا.","اعرض صورة شخص يحمل جسمًا دون حركة.","اطلب من الطالب تحليل: هل توجد حركة؟ هل توجد إزاحة؟","ناقش العلاقة بين: القوة + الإزاحة = شغل","اطلب من الروبوت طرح سؤال تفكير عميق: لماذا نشعر بالتعب حتى عندما لا يُنجز شغل علمي؟"],
    expectedAnswer:"في رفع الأثقال توجد حركة وإزاحة، لذلك يحدث شغل. أما في حمل الجسم ثابتًا فلا توجد إزاحة، لذلك لا يحدث شغل علمي.",
    expectedExt:{ deep:"نشعر بالتعب لأن عضلات الجسم تبذل جهدًا وتحافظ على وضع الجسم، لكن لا يحدث شغل علمي لعدم وجود إزاحة." },
    mediaIds:["MED-I-04","MED-I-05"], ngssTagIds:["SEP-01","SEP-05","CCC-01","DCI-01"],
    botTrigger:"AUTO_AFTER_TABLE", botQuestion:"لماذا نشعر بالتعب حتى عندما لا يُنجز شغل علمي؟",
  },
];

export const workbook: WorkbookItem[] = [
  { id:"WB-01", activityId:"ACT-01", lessonId:"L1-1", itemNumber:1, sectionLabel:"نشاط (١): هل كل تعب يُعد شغلًا؟", interactionType:"TEXT_INPUT",
    inputFields:[
      { key:"main_answer", type:"textarea", rows:3, label:"في أي حالة تم إنجاز شغل علمي؟ ولماذا؟", required:true },
      { key:"conc_force", type:"text", label:"أستنتج — العلاقة بين القوة:", required:true },
      { key:"conc_displace", type:"text", label:"أستنتج — الإزاحة:", required:true },
      { key:"conc_direction", type:"text", label:"أستنتج — اتجاه الحركة:", required:true },
    ],
    grading:{ method:"keyword_match_then_teacher", keywords:["قوة","إزاحة","اتجاه","رفع"], autoGradeable:false, teacherReviewRequired:true },
    feedbackMode:"chatbot_immediate_then_teacher_final", needsBot:true, needsMedia:true },
  { id:"WB-02", activityId:"ACT-02", lessonId:"L1-1", itemNumber:2, sectionLabel:"نشاط (٢): هل أنجزت شغلًا؟", interactionType:"MULTI_COMPONENT",
    inputFields:[
      { key:"work_case", type:"text", label:"الحالة التي حدث فيها شغل:", required:true },
      { key:"sci_reason", type:"textarea", rows:2, label:"السبب العلمي:", required:true },
      { key:"sim_table", type:"observation_table", label:"ملاحظات المحاكاة", columns:[{key:"force",label:"مقدار القوة",input:"text"},{key:"distance",label:"المسافة",input:"text"},{key:"direction",label:"اتجاه القوة",input:"text"},{key:"has_work",label:"هل حدث شغل؟",input:"select",options:["نعم","لا"]},{key:"why",label:"لماذا؟",input:"text"}], rowsSource:"dynamic_from_simulation", minRows:2 },
      { key:"conclusion", type:"textarea", rows:2, label:"استنتاجي:", required:true },
    ],
    grading:{ method:"teacher_review", autoGradeable:false, teacherReviewRequired:true },
    feedbackMode:"chatbot_hints_then_teacher", needsBot:true, needsMedia:true },
  { id:"WB-03", activityId:"ACT-03", lessonId:"L1-1", itemNumber:3, sectionLabel:"نشاط (٣): الاحتكاك... صديق أم عدو؟", interactionType:"MULTI_COMPONENT",
    inputFields:[
      { key:"surface", type:"text", label:"السطح الذي تطلب قوة أكبر:", required:true },
      { key:"reason", type:"text", label:"السبب:", required:true },
      { key:"results_table", type:"observation_table", label:"نتائج المحاكاة", columns:[{key:"surface_type",label:"نوع السطح",input:"label"},{key:"friction",label:"قوة الاحتكاك",input:"text"},{key:"force_req",label:"القوة المطلوبة",input:"text"},{key:"energy",label:"ماذا حدث للطاقة؟",input:"text"}], fixedRows:[{rowKey:"smooth",surface_type:"أملس"},{rowKey:"rough",surface_type:"خشن"}] },
      { key:"friction_effect", type:"textarea", rows:2, label:"كيف يؤثر الاحتكاك في الشغل؟", required:true },
    ],
    grading:{ method:"teacher_review", autoGradeable:false, teacherReviewRequired:true },
    feedbackMode:"chatbot_hints_then_teacher", needsBot:true, needsMedia:true },
  { id:"WB-04", activityId:"ACT-04", lessonId:"L1-1", itemNumber:4, sectionLabel:"نشاط (٤): رفع أم حمل؟", interactionType:"COMPARE_AND_JUSTIFY",
    inputFields:[
      { key:"compare_table", type:"comparison_table", label:"جدول المقارنة", columns:[{key:"case_label",label:"الحالة",input:"label"},{key:"has_disp",label:"هل توجد إزاحة؟",input:"select",options:["نعم","لا"]},{key:"has_work",label:"هل حدث شغل؟",input:"select",options:["نعم","لا"]},{key:"explanation",label:"التفسير العلمي",input:"text"}], fixedRows:[{rowKey:"lift",case_label:"رفع الثقل"},{rowKey:"hold",case_label:"حمل الثقل ثابتًا"}] },
      { key:"deep_answer", type:"textarea", rows:2, label:"لماذا لا يُعد الاحتفاظ بالثقل شغلًا رغم التعب؟", required:true },
    ],
    grading:{ method:"auto_select_then_teacher", autoGradeable:true, teacherReviewRequired:true, autoGradeRules:{lift_has_disp:"نعم",lift_has_work:"نعم",hold_has_disp:"لا",hold_has_work:"لا"} },
    feedbackMode:"auto_for_select_chatbot_for_text", needsBot:true, needsMedia:true },
];

export const assessment: Assessment = {
  id:"ASSESS-01", lessonId:"L1-1", screenId:"SCR-08", durationMin:5, totalMarks:13,
  questions:[
    { id:"Q-01", orderIdx:1, qtype:"OPEN_ENDED", marks:4, text:"إذا دفعت صندوقًا على سطح أملس ثم على سطح خشن بنفس المسافة، في أي الحالتين تبذل شغلًا أكبر؟ ولماذا؟", inputType:"textarea", autoGraded:false, modelAnswer:"الشغل أكبر على السطح الخشن لأن الاحتكاك أكبر ويعاكس الحركة، مما يتطلب قوة أكبر لإحداث نفس الإزاحة.", rubric:[{criterion:"تحديد الحالة الصحيحة",marks:1},{criterion:"مفهوم الاحتكاك",marks:1},{criterion:"ربط بالقوة",marks:1},{criterion:"تفسير منطقي",marks:1}], ngssTagIds:["SEP-01","CCC-01","DCI-02"] },
    { id:"Q-02", orderIdx:2, qtype:"EXPERIMENT_DESIGN", marks:8, text:"صمّم تجربة رقمية باستخدام المحاكاة لتوضيح كيف يؤثر الاحتكاك في مقدار الشغل المبذول عند دفع جسم.", inputType:"structured_form", autoGraded:false,
      inputFields:[{key:"iv",type:"text",label:"المتغير المستقل"},{key:"dv",type:"text",label:"المتغير التابع"},{key:"step1",type:"text",label:"الخطوة ١"},{key:"step2",type:"text",label:"الخطوة ٢"},{key:"step3",type:"text",label:"الخطوة ٣"},{key:"result",type:"textarea",rows:2,label:"تفسير النتائج"}],
      modelAnswer:"المتغير المستقل: نوع السطح. التابع: مقدار القوة. الخطوات: تثبيت الكتلة → تغيير الاحتكاك → قياس القوة. النتيجة: كلما زاد الاحتكاك زادت القوة والشغل.",
      rubric:[{criterion:"المتغير المستقل",marks:1},{criterion:"المتغير التابع",marks:1},{criterion:"خطوات واضحة",marks:2},{criterion:"استخدام المحاكاة",marks:1},{criterion:"تفسير صحيح",marks:2},{criterion:"ربط بالاحتكاك",marks:1}], ngssTagIds:["SEP-04","SEP-03","CCC-01","DCI-01","DCI-02"] },
    { id:"Q-03", orderIdx:3, qtype:"MCQ", marks:1, text:"عند زيادة الاحتكاك بين سطحين، فإن الشغل المبذول:", inputType:"single_select", autoGraded:true, correctKey:"c",
      options:[{key:"a",text:"يقل",correct:false},{key:"b",text:"لا يتغير",correct:false},{key:"c",text:"يزداد",correct:true},{key:"d",text:"يساوي صفر",correct:false}],
      feedback:{c:"إجابة صحيحة! عند زيادة الاحتكاك نحتاج قوة أكبر فيزداد الشغل.",a:"الاحتكاك يزيد القوة المطلوبة. تذكّر: الشغل = القوة × الإزاحة.",b:"الاحتكاك يغيّر القوة المطلوبة.",d:"الشغل لا يساوي صفر طالما توجد إزاحة."},
      ngssTagIds:["SEP-01","CCC-01","DCI-02"] },
  ],
};

export const closures: Closure[] = [
  { id:"CLS-01", lessonId:"L1-1", screenId:"SCR-09", orderIdx:1, title:"تثبيت المفهوم", durationMin:1, scenario:"صندوق يُدفع على سطح خشن لمسافة محددة بسرعة منتظمة", promptType:"completion", promptText:"يحدث الشغل عندما ___", expectedAnswer:"يحدث الشغل عندما تؤثر قوة على جسم وتحدث له إزاحة في اتجاهها.", inputFields:[{key:"closure1",type:"text",label:"أكمل الجملة"}], autoGraded:false, visualAfter:"قوة ⬅ إزاحة ⬅ انتقال طاقة" },
  { id:"CLS-02", lessonId:"L1-1", screenId:"SCR-10", orderIdx:2, title:"تتبع الطاقة داخل النظام", durationMin:2, scenario:"صندوق يُدفع على سطح خشن لمسافة مترين بسرعة منتظمة", promptType:"multi_question", promptText:"تتبع مسار الطاقة", expectedAnswer:"بدأت الطاقة من الشخص المؤثر بالقوة، ثم انتقلت إلى الصندوق على شكل حركة، ومع وجود الاحتكاك تحوّل جزء منها إلى حرارة.", inputFields:[{key:"cls2_q1",type:"text",label:"من أين جاءت الطاقة؟"},{key:"cls2_q2",type:"text",label:"إلى أين انتقلت؟"},{key:"cls2_q3",type:"text",label:"ماذا فعل الاحتكاك بالطاقة؟"}], autoGraded:false },
  { id:"CLS-03", lessonId:"L1-1", screenId:"SCR-11", orderIdx:3, title:"التفكير التأملي العميق", durationMin:1, promptType:"open_reflection", promptText:"لماذا نشعر بالتعب عند حمل جسم ثابت رغم أن الشغل العلمي يساوي صفر؟", expectedAnswer:"نشعر بالتعب لأن عضلات الجسم تبذل جهدًا مستمرًا للمحافظة على وضع الجسم، لكن لا يحدث شغل علمي لعدم وجود إزاحة.", inputFields:[{key:"closure3",type:"textarea",rows:2,label:"تفسيري"}], autoGraded:false },
  { id:"CLS-04", lessonId:"L1-1", screenId:"SCR-12", orderIdx:4, title:"تثبيت سريع — Exit Ticket", durationMin:1, promptType:"mcq", promptText:"أي العبارات التالية الصحيحة؟", expectedAnswer:"الاحتكاك يعاكس الحركة.", inputFields:[{key:"exit",type:"select",label:"اختر"}], options:[{key:"a",text:"الاحتكاك يعاكس الحركة.",correct:true},{key:"b",text:"يحدث الشغل بدون حركة.",correct:false},{key:"c",text:"الشغل يساوي القوة فقط.",correct:false}], correctKey:"a", autoGraded:true },
];

export const media: MediaAsset[] = [
  { id:"MED-V-01", lessonId:"L1-1", kind:"VIDEO", title:"رفع صندوق مقابل حمل صندوق", description:"فيديو قصير يتضمن حالتين: شخص يرفع صندوقًا إلى أعلى. شخص يحمل صندوقًا دون حركة لمدة دقيقة.", purpose:"إثارة التعارض المعرفي", durationRange:"30-60s", screenId:"SCR-01", position:"top", autoPlay:true, trackDone:true, fileUrl:"", logRuns:false },
  { id:"MED-V-02", lessonId:"L1-1", kind:"VIDEO", title:"ثلاث حالات للشغل", description:"رفع صندوق لأعلى. دفع صندوق بسرعة ثابتة. حمل صندوق دون حركة.", purpose:"تحليل متى يُنجز شغل", durationRange:"30-45s", screenId:"SCR-03", position:"top", autoPlay:true, trackDone:true, fileUrl:null, logRuns:false },
  { id:"MED-V-03", lessonId:"L1-1", kind:"VIDEO", title:"دفع صندوق على سطحين", description:"دفع صندوق على سطح أملس. دفع صندوق على سطح خشن.", purpose:"ملاحظة تأثير الاحتكاك", durationRange:"20-30s", screenId:"SCR-05", position:"top", autoPlay:true, trackDone:true, fileUrl:null, logRuns:false },
  { id:"MED-I-04", lessonId:"L1-1", kind:"IMAGE", title:"رياضي يرفع أثقالًا", screenId:"SCR-07", position:"right", autoPlay:false, trackDone:false, fileUrl:"", logRuns:false },
  { id:"MED-I-05", lessonId:"L1-1", kind:"IMAGE", title:"شخص يحمل جسمًا ثابتًا", screenId:"SCR-07", position:"left", autoPlay:false, trackDone:false, fileUrl:null, logRuns:false },
  { id:"MED-SIM-01", lessonId:"L1-1", kind:"SIMULATION", title:"محاكاة القوة والإزاحة والشغل", screenId:"SCR-03", position:"below_video", autoPlay:false, trackDone:false, fileUrl:null, componentName:"ForceDisplacementSim", controls:[{key:"force",type:"slider",min:0,max:20,step:0.5,unit:"N",label:"مقدار القوة"},{key:"distance",type:"slider",min:0,max:10,step:0.5,unit:"م",label:"المسافة"},{key:"angle",type:"slider",min:0,max:180,step:5,unit:"درجة",label:"اتجاه القوة"}], outputs:["has_work","work_value","animation"], logRuns:true },
  { id:"MED-SIM-02", lessonId:"L1-1", kind:"SIMULATION", title:"محاكاة الاحتكاك", screenId:"SCR-05", position:"center", autoPlay:false, trackDone:false, fileUrl:null, componentName:"FrictionSim", controls:[{key:"friction_coeff",type:"slider",min:0,max:1,step:0.1,unit:"",label:"معامل الاحتكاك"},{key:"applied_force",type:"slider",min:0,max:20,step:0.5,unit:"N",label:"القوة المؤثرة"}], outputs:["friction_force","net_force","has_work","heat"], logRuns:true },
];

export const botConfig: BotConfig = {
  id:"BOT-L1-1", lessonId:"L1-1", botName:"مساعد العلوم", botAvatar:"🤖",
  systemPrompt:"أنت 'مساعد العلوم' — روبوت تعليمي مخصص لطلاب الصف الخامس.\n\nقواعدك:\n1. معرفتك محصورة في الدرس 1-1: متى يحدث الشغل؟\n2. لا تجب عن أسئلة خارج هذا الدرس.\n3. لا تعطِ الإجابة مباشرة. استخدم التلميحات المتدرجة.\n4. لغة عربية بسيطة لطفل 10-11 سنة.\n5. ردودك: 1-3 جمل.\n6. لا تكرر نفس التلميح.\n7. شجّع التفكير.",
  outOfScope:["سؤال جميل! لكنني متخصص فقط في دروس الشغل والطاقة. هل عندك سؤال عن الدرس؟ 😊","أحب فضولك! لكن دعنا نركز على درس الشغل والطاقة.","هذا خارج محتوى درسنا. هيا نعود لموضوع الشغل والطاقة! 🔬"],
  rules:{ maxSentences:3, maxChars:200, neverDirectAnswer:true, maxHintReuse:1, variations:["rephrase","example","analogy","counter_question"], langLevel:"grade_5_arabic" },
  chunks:[
    { id:"KC-01", content:"الشغل في المفهوم العلمي لا يعني التعب. الشغل يحدث فقط إذا: أثرت قوة على جسم، وحدثت إزاحة للجسم، وكانت الإزاحة في اتجاه القوة.", activityIds:["ACT-01","ACT-02"] },
    { id:"KC-02", content:"الشغل = القوة × الإزاحة.", activityIds:["ACT-02"] },
    { id:"KC-03", content:"في المفهوم الحياتي قد يُقصد بالشغل مجرد التعب أو بذل الجهد، أما في المفهوم العلمي فلا يحدث الشغل إلا إذا أثرت قوة في جسم وأحدثت له إزاحة في اتجاهها.", activityIds:["ACT-01","ACT-04"] },
    { id:"KC-04", content:"الاحتكاك يعاكس الحركة. عند وجود احتكاك يلزم بذل قوة أكبر. جزء من الطاقة يتحول إلى طاقة حرارية. الطاقة لا تختفي بل تتحول.", activityIds:["ACT-03"] },
    { id:"KC-05", content:"كلما زادت القوة أو زادت المسافة، زاد مقدار الشغل المبذول.", activityIds:["ACT-03"] },
    { id:"KC-06", content:"نشعر بالتعب لأن عضلات الجسم تبذل جهدًا وتحافظ على وضع الجسم، لكن لا يحدث شغل علمي لعدم وجود إزاحة.", activityIds:["ACT-04"] },
  ],
  scripts:[
    { activityId:"ACT-01", trigger:"AUTO_AFTER_VIDEO", opening:"في أي حالة تم إنجاز شغل علمي؟ ولماذا؟",
      hintLadder:[{level:1,text:"فكّر: هل تحرك الصندوق من مكانه في كلتا الحالتين؟"},{level:2,text:"الشغل العلمي يحتاج إزاحة. في أي حالة كانت هناك إزاحة؟"},{level:3,text:"تذكّر: الشغل = قوة + إزاحة في اتجاه القوة."},{level:4,text:"عند رفع الصندوق: القوة دفعته لأعلى وتحرك لأعلى = شغل ✓. عند حمله: لم يتحرك = لا شغل ✗"}],
      correct:["أحسنت! رفع الصندوق فيه قوة وإزاحة = شغل علمي. 🌟","ممتاز! الشغل يحتاج حركة. هذا الفرق بين المفهوم الحياتي والعلمي!","بالضبط! عندما يتحرك الجسم في اتجاه القوة، يحدث شغل. 👏"],
      wrong:["فكّر معي: هل تحرك الصندوق في حالة الحمل؟ 🤔","الشغل العلمي يحتاج إزاحة. هل توجد إزاحة في الحمل؟","ما الفرق بين التعب والشغل العلمي؟ فكّر في الحركة..."],
      partial:["بداية جيدة! لماذا تحديدًا؟ ما شروط حدوث الشغل؟","ممتاز أنك اخترت الحالة الصحيحة! ما العلاقة بين القوة والإزاحة؟"] },
    { activityId:"ACT-02", trigger:"AUTO_AFTER_VIDEO", opening:"في أي حالة تم إنجاز شغل؟ ولماذا؟",
      hintLadder:[{level:1,text:"في أي حالة تحرك الصندوق من مكانه؟"},{level:2,text:"هل اتجاه القوة موافق لاتجاه الحركة؟"},{level:3,text:"الشغل يحدث فقط إذا أثرت قوة وأحدثت إزاحة في اتجاهها."}] },
    { activityId:"ACT-03", trigger:"ON_DEMAND", opening:"أيهما يتطلب قوة أكبر: الأملس أم الخشن؟ ولماذا؟",
      hintLadder:[{level:1,text:"ما الذي يعاكس الحركة على السطح الخشن؟"},{level:2,text:"الاحتكاك يعاكس الحركة. أيهما فيه احتكاك أكبر؟"},{level:3,text:"عند زيادة الاحتكاك نحتاج قوة أكبر، ويتحول جزء من الطاقة إلى حرارة."}] },
    { activityId:"ACT-04", trigger:"AUTO_AFTER_TABLE", opening:"لماذا نشعر بالتعب عندما لا يُنجز شغل علمي؟",
      hintLadder:[{level:1,text:"هل توجد إزاحة عند حمل الثقل ثابتًا؟"},{level:2,text:"العضلات تبذل جهدًا، لكن هل يتحرك الجسم؟"},{level:3,text:"التعب لأن العضلات تعمل، لكن الشغل يحتاج إزاحة. لا إزاحة = لا شغل."}] },
  ],
};

// ── Screen Definitions (used by LessonShell to determine what to render) ──

export const screens: ScreenDef[] = [
  { id:"SCR-01", orderIdx:0,  phase:"WARMUP",     title:"التهيئة: هل كل تعب يُعد شغلًا؟",       phaseLabel:"التهيئة (5 دقائق)",              type:"warmup",     activityId:"ACT-01", ngssTagIds:["SEP-01","CCC-01","DCI-01"] },
  { id:"SCR-02", orderIdx:1,  phase:"CONTENT",    title:"مفهوم الشغل والعلاقة بين القوة والإزاحة", phaseLabel:"عرض المحتوى (5 دقائق)",          type:"concept",    ngssTagIds:["DCI-01"],
    contentBlocks:[
      { type:"formula_hero", text:"الشغل = القوة × الإزاحة" },
      { type:"warning", text:"الشغل في المفهوم العلمي لا يعني التعب." },
      { type:"conditions", items:["أثرت قوة على جسم","حدثت إزاحة للجسم","كانت الإزاحة في اتجاه القوة"] },
      { type:"comparison_cards", cards:[{label:"رفع صندوق لأعلى",result:"✓ يوجد شغل",positive:true},{label:"حمل صندوق دون حركة",result:"✗ لا يوجد شغل",positive:false}] },
      { type:"concept_note", text:"في المفهوم الحياتي قد يُقصد بالشغل مجرد التعب أو بذل الجهد، أما في المفهوم العلمي فلا يحدث الشغل إلا إذا أثرت قوة في جسم وأحدثت له إزاحة في اتجاهها." },
    ] },
  { id:"SCR-03", orderIdx:2,  phase:"ACTIVITY",   title:"نشاط (٢): هل أنجزت شغلًا؟",             phaseLabel:"الأنشطة (5 دقائق)",              type:"activity",   activityId:"ACT-02", ngssTagIds:["SEP-03","CCC-01","DCI-01"] },
  { id:"SCR-04", orderIdx:3,  phase:"CONTENT",    title:"العلاقة بين اتجاه القوة والحركة",        phaseLabel:"عرض المحتوى (5 دقائق)",          type:"concept",    ngssTagIds:["DCI-01","CCC-02"],
    contentBlocks:[
      { type:"rule_cards", rules:[{condition:"القوة في نفس اتجاه الحركة",result:"يحدث شغل",color:"green"},{condition:"القوة عكس الحركة",result:"الشغل يكون سالبًا",color:"orange"},{condition:"لم توجد إزاحة",result:"لا يحدث شغل",color:"red"}] },
    ] },
  { id:"SCR-05", orderIdx:4,  phase:"ACTIVITY",   title:"نشاط (٣): الاحتكاك... صديق أم عدو؟",    phaseLabel:"الأنشطة (5 دقائق)",              type:"activity",   activityId:"ACT-03", ngssTagIds:["SEP-03","CCC-03","DCI-02"] },
  { id:"SCR-06", orderIdx:5,  phase:"CONTENT",    title:"تأثير الاحتكاك وانتقال الطاقة",           phaseLabel:"عرض المحتوى (5 دقائق)",          type:"concept",    ngssTagIds:["DCI-02","CCC-03"],
    contentBlocks:[
      { type:"energy_flow", steps:["قوة 💪","إزاحة 📏","انتقال طاقة ⚡"] },
      { type:"fact_cards", facts:["عند وجود احتكاك، يلزم بذل قوة أكبر.","جزء من الطاقة يتحول إلى طاقة حرارية.","الطاقة لا تختفي، بل تتحول من صورة إلى أخرى."] },
      { type:"formula_hero", text:"كلما زادت القوة أو زادت المسافة، زاد مقدار الشغل المبذول" },
    ] },
  { id:"SCR-07", orderIdx:6,  phase:"ACTIVITY",   title:"نشاط (٤): رفع أم حمل؟",                 phaseLabel:"الأنشطة (5 دقائق)",              type:"activity",   activityId:"ACT-04", ngssTagIds:["SEP-01","CCC-01","DCI-01"] },
  { id:"SCR-08", orderIdx:7,  phase:"ASSESSMENT", title:"التقويم",                                phaseLabel:"التقويم (5 دقائق)",              type:"assessment", ngssTagIds:["SEP-04","CCC-01","DCI-01","DCI-02"] },
  { id:"SCR-09", orderIdx:8,  phase:"CLOSURE",    title:"الغلق: تثبيت المفهوم",                   phaseLabel:"الغلق — المرحلة ١ (1 دقيقة)",    type:"closure",    closureIdx:0, ngssTagIds:["DCI-01"] },
  { id:"SCR-10", orderIdx:9,  phase:"CLOSURE",    title:"الغلق: تتبع الطاقة",                     phaseLabel:"الغلق — المرحلة ٢ (2 دقيقة)",    type:"closure",    closureIdx:1, ngssTagIds:["CCC-02","DCI-02"] },
  { id:"SCR-11", orderIdx:10, phase:"CLOSURE",    title:"الغلق: التفكير التأملي",                  phaseLabel:"الغلق — المرحلة ٣ (1 دقيقة)",    type:"closure",    closureIdx:2, ngssTagIds:["SEP-01"] },
  { id:"SCR-12", orderIdx:11, phase:"CLOSURE",    title:"تذكرة الخروج",                           phaseLabel:"الغلق — المرحلة ٤ (1 دقيقة)",    type:"closure",    closureIdx:3, ngssTagIds:["DCI-01","DCI-02"] },
  { id:"SCR-13", orderIdx:12, phase:"SUMMARY",    title:"الملخص الختامي",                         phaseLabel:"الملخص",                         type:"summary",    ngssTagIds:[] },
];

// ── Full Export ──
export const lessonData: LessonData = { lesson, expectations, sections, activities, workbook, assessment, closures, media, botConfig, screens, ngss };
export default lessonData;
