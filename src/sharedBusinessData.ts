export type Product = { id:string; name:string; sku:string; category:string; stock:number; minimumStock:number; supplier:string; price:number; unitCost:number; vatRate:number; sold:number };
export type Customer = { id:string; company:string; fiscalCode:string; contactPerson:string; email:string; phone:string; type:'Prospect'|'Activ'|'Inactiv'; totalContractsValue:number };
export type Lead = { id:string; company:string; contactPerson:string; contact:string; source:'Website'|'Recomandare'|'Campanie'|'Cold call'; interest:'Website'|'Magazin online'|'CRM'|'ERP'|'Automatizare'; estimatedValue:number; status:'Nou'|'Contactat'|'Calificat'|'Pierdut' };
export type Order = { id:string; customer:string; orderNumber:string; productSkus:string[]; value:number; deliveryDate:string; status:'Draft'|'Confirmată'|'În lucru'|'Finalizată'|'Anulată'; channel:'CRM'|'eCommerce'; month:string };
export type Invoice = { id:string; documentType:'Factură'|'Proformă'; number:string; client:string; description:string; value:number; vatRate:number; dueDate:string; status:'Proformă'|'Emisă'|'Plătită'|'Restantă'|'Stornată' };
export type Expense = { id:string; type:string; supplier:string; value:number; date:string; paymentStatus:'Neplătită'|'Programată'|'Plătită'; costCenter:string };

export const formatRon = (value:number) => new Intl.NumberFormat('ro-RO', { maximumFractionDigits: 0 }).format(value) + ' RON';
export const formatPercent = (value:number) => `${value}%`;

export const erpInventory: Product[] = [
 {id:'stock-1',name:'Laptop Carbon X',sku:'LCX-14-PRO',category:'Laptopuri',stock:42,minimumStock:10,supplier:'CarbonTech Distribution',price:6290,unitCost:4550,vatRate:19,sold:18},
 {id:'stock-2',name:'Monitor UltraWide 34',sku:'MUW-34',category:'Monitoare',stock:8,minimumStock:12,supplier:'Nordic Displays',price:2190,unitCost:1510,vatRate:19,sold:22},
 {id:'stock-3',name:'Docking Station AI',sku:'DSAI-11P',category:'Accesorii',stock:126,minimumStock:30,supplier:'SmartDock Europe',price:749,unitCost:430,vatRate:19,sold:64},
 {id:'stock-4',name:'Smartwatch Pro X',sku:'SWPX-45',category:'Wearables',stock:31,minimumStock:15,supplier:'TechWear Global',price:1690,unitCost:980,vatRate:19,sold:57},
 {id:'stock-5',name:'Căști NoiseShield Max',sku:'NSM-900',category:'Audio',stock:54,minimumStock:18,supplier:'AudioLink',price:899,unitCost:510,vatRate:19,sold:46},
 {id:'stock-6',name:'Router Mesh Office 6E',sku:'RMO-6E',category:'Networking',stock:17,minimumStock:10,supplier:'NetCore',price:1190,unitCost:760,vatRate:19,sold:21},
 {id:'stock-7',name:'Tastatură Mechanical Pro',sku:'KMP-RGB',category:'Accesorii',stock:0,minimumStock:14,supplier:'InputLab',price:549,unitCost:290,vatRate:19,sold:33},
 {id:'stock-8',name:'Mouse Precision MX',sku:'MPMX-2',category:'Accesorii',stock:68,minimumStock:20,supplier:'InputLab',price:329,unitCost:155,vatRate:19,sold:72},
 {id:'stock-9',name:'Camera Conferință 4K',sku:'VCAM-4K',category:'Video',stock:11,minimumStock:8,supplier:'VisionWorks',price:1390,unitCost:840,vatRate:19,sold:15},
 {id:'stock-10',name:'Hub USB-C Travel',sku:'HUBC-7',category:'Accesorii',stock:95,minimumStock:25,supplier:'SmartDock Europe',price:249,unitCost:105,vatRate:19,sold:88},
];

export const customers: Customer[] = [
 {id:'customer-1',company:'GadgetHub.ro',fiscalCode:'RO45890123',contactPerson:'Irina Popescu',email:'irina@gadgethub.ro',phone:'0733 410 900',type:'Activ',totalContractsValue:82000},
 {id:'customer-2',company:'TechWear București',fiscalCode:'RO77351204',contactPerson:'Andrei Ionescu',email:'andrei@techwear.ro',phone:'0744 220 118',type:'Activ',totalContractsValue:54000},
 {id:'customer-3',company:'OfficeNova SRL',fiscalCode:'RO99230115',contactPerson:'Mara Dinu',email:'mara@officenova.ro',phone:'0722 110 456',type:'Activ',totalContractsValue:37600},
 {id:'customer-4',company:'MedPrime Clinics',fiscalCode:'RO61773320',contactPerson:'Paul Radu',email:'paul@medprime.ro',phone:'0740 300 210',type:'Prospect',totalContractsValue:18500},
 {id:'customer-5',company:'EduLab Digital',fiscalCode:'RO40988117',contactPerson:'Ioana Matei',email:'ioana@edulab.ro',phone:'0731 555 420',type:'Activ',totalContractsValue:61100},
 {id:'customer-6',company:'RetailOne Cluj',fiscalCode:'RO22091466',contactPerson:'Vlad Neagu',email:'vlad@retailone.ro',phone:'0755 702 332',type:'Inactiv',totalContractsValue:12800},
];

export const leads: Lead[] = [
 {id:'lead-1',company:'BrightLabs',contactPerson:'Ana Stan',contact:'ana@brightlabs.ro',source:'Website',interest:'Magazin online',estimatedValue:18400,status:'Nou'},
 {id:'lead-2',company:'UrbanDesk',contactPerson:'Radu Pavel',contact:'0721 880 231',source:'Campanie',interest:'ERP',estimatedValue:32000,status:'Contactat'},
 {id:'lead-3',company:'AutoFleet',contactPerson:'Sorin Enache',contact:'sorin@autofleet.ro',source:'Recomandare',interest:'CRM',estimatedValue:14700,status:'Calificat'},
];

export const orders: Order[] = [
 {id:'order-1',customer:'GadgetHub.ro',orderNumber:'CMD-2026-018',productSkus:['LCX-14-PRO','DSAI-11P'],value:28160,deliveryDate:'30 Iun 2026',status:'Confirmată',channel:'CRM',month:'Ian'},
 {id:'order-2',customer:'TechWear București',orderNumber:'WEB-2026-019',productSkus:['SWPX-45','NSM-900'],value:42880,deliveryDate:'08 Iul 2026',status:'În lucru',channel:'eCommerce',month:'Feb'},
 {id:'order-3',customer:'OfficeNova SRL',orderNumber:'CMD-2026-020',productSkus:['MUW-34','RMO-6E'],value:18940,deliveryDate:'12 Iul 2026',status:'Finalizată',channel:'CRM',month:'Mar'},
 {id:'order-4',customer:'EduLab Digital',orderNumber:'WEB-2026-021',productSkus:['HUBC-7','MPMX-2'],value:13220,deliveryDate:'14 Iul 2026',status:'Finalizată',channel:'eCommerce',month:'Apr'},
 {id:'order-5',customer:'MedPrime Clinics',orderNumber:'CMD-2026-022',productSkus:['VCAM-4K','RMO-6E'],value:25800,deliveryDate:'18 Iul 2026',status:'Confirmată',channel:'CRM',month:'Mai'},
 {id:'order-6',customer:'GadgetHub.ro',orderNumber:'WEB-2026-023',productSkus:['DSAI-11P','HUBC-7'],value:21470,deliveryDate:'20 Iul 2026',status:'În lucru',channel:'eCommerce',month:'Iun'},
 {id:'order-7',customer:'OfficeNova SRL',orderNumber:'WEB-2026-024',productSkus:['NSM-900'],value:16182,deliveryDate:'22 Iul 2026',status:'Draft',channel:'eCommerce',month:'Iun'},
 {id:'order-8',customer:'EduLab Digital',orderNumber:'CMD-2026-025',productSkus:['LCX-14-PRO','MUW-34'],value:50880,deliveryDate:'26 Iul 2026',status:'Finalizată',channel:'CRM',month:'Iul'},
 {id:'order-9',customer:'TechWear București',orderNumber:'WEB-2026-026',productSkus:['MPMX-2','HUBC-7'],value:17340,deliveryDate:'28 Iul 2026',status:'Confirmată',channel:'eCommerce',month:'Iul'},
];

export const invoices: Invoice[] = orders.map((order, i) => ({ id:`invoice-${i+1}`, documentType: i === 6 ? 'Proformă' : 'Factură', number: `${i===6?'PRO':'FCT'}-2026-${String(i+1).padStart(3,'0')}`, client: order.customer, description:`${order.orderNumber} • ${order.productSkus.join(', ')}`, value: order.value, vatRate:19, dueDate:`${10+i} Iul 2026`, status: i===1||i===5?'Restantă':i===6?'Proformă':i===3?'Emisă':'Plătită' }));
export const expenses: Expense[] = [
 {id:'expense-1',type:'Achiziții laptopuri',supplier:'CarbonTech Distribution',value:38200,date:'20 Iun 2026',paymentStatus:'Programată',costCenter:'Achiziții'},
 {id:'expense-2',type:'Campanie PPC wearables',supplier:'SmartAds Electronics',value:6800,date:'21 Iun 2026',paymentStatus:'Neplătită',costCenter:'Marketing'},
 {id:'expense-3',type:'Curierat gadgeturi fragile',supplier:'Rapid Gadget Courier',value:1780,date:'24 Iun 2026',paymentStatus:'Plătită',costCenter:'Logistică'},
 {id:'expense-4',type:'Recepție accesorii',supplier:'SmartDock Europe',value:12900,date:'25 Iun 2026',paymentStatus:'Plătită',costCenter:'Achiziții'},
 {id:'expense-5',type:'Licențe magazin online',supplier:'CloudRetail',value:2400,date:'26 Iun 2026',paymentStatus:'Programată',costCenter:'Operațional'},
 {id:'expense-6',type:'Service garanții',supplier:'RepairNet',value:3100,date:'27 Iun 2026',paymentStatus:'Neplătită',costCenter:'Suport'},
 {id:'expense-7',type:'Fotografie produse',supplier:'Studio Pixel',value:1900,date:'28 Iun 2026',paymentStatus:'Plătită',costCenter:'Marketing'},
];

export const getAvailableProducts = () => erpInventory.filter((product) => product.stock > 0);
export const getLowStockProducts = () => erpInventory.filter((product) => product.stock <= product.minimumStock);
export const getActiveOrders = () => orders.filter((order) => ['Draft','Confirmată','În lucru'].includes(order.status));
export const getTotalSales = () => orders.filter((order) => order.status !== 'Anulată').reduce((sum, order) => sum + order.value, 0);
export const getEstimatedRevenue = () => invoices.filter((invoice) => invoice.status !== 'Stornată').reduce((sum, invoice) => sum + invoice.value, 0);
export const getOutstandingInvoices = () => invoices.filter((invoice) => invoice.status === 'Restantă' || invoice.status === 'Emisă');
export const getEstimatedProfit = () => getEstimatedRevenue() - expenses.reduce((sum, expense) => sum + expense.value, 0);
export const getMonthlySales = () => ['Ian','Feb','Mar','Apr','Mai','Iun','Iul'].map((month) => ({ month, value: orders.filter((order) => order.month === month && order.status !== 'Anulată').reduce((sum, order) => sum + order.value, 0) }));
export const getExpenseCategories = () => {
 const total = expenses.reduce((sum, expense) => sum + expense.value, 0) || 1;
 const colors = ['bg-indigo-500','bg-purple-500','bg-pink-500','bg-amber-500','bg-emerald-500','bg-blue-500'];
 return Array.from(new Set(expenses.map((e) => e.costCenter))).map((center, index) => {
  const value = expenses.filter((e) => e.costCenter === center).reduce((sum, e) => sum + e.value, 0);
  return { name:center, percent: Math.round((value / total) * 100), color: colors[index % colors.length] };
 });
};
