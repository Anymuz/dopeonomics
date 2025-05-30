// export function calculateTotalEarnings(member) {
//   if (!member.transactions || !Array.isArray(member.transactions)) return 0;
//   return member.transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
// };

// export function calculateTransactionCount(member) {
//   if (!member.transactions || !Array.isArray(member.transactions)) return 0;
//   return member.transactions.length;
// };

// export function calculateRoleStats(crew = []) {
//   const roleStats = {};

//   crew.forEach(member => {
//     const role = member.role || 'Unassigned';
//     if (!roleStats[role]) {
//       roleStats[role] = {
//         count: 0,
//         totalEarnings: 0,
//         transactionCount: 0,
//       };
//     }

//     roleStats[role].count += 1;
//     roleStats[role].totalEarnings += calculateTotalEarnings(member);
//     roleStats[role].transactionCount += calculateTransactionCount(member);
//   });

//   return roleStats;
// };

// export function summarizeTransactions(transactions = []) {
//   if (!Array.isArray(transactions)) return { dates: [], revenue: [], expenses: [], profit: [] };

//   const summaryMap = {};

//   transactions.forEach(tx => {
//     const date = tx.date || 'Unknown';
//     if (!summaryMap[date]) summaryMap[date] = { revenue: 0, expenses: 0 };
//     if (tx.type === 'sale') summaryMap[date].revenue += tx.amount || 0;
//     if (tx.type === 'expense') summaryMap[date].expenses += tx.amount || 0;
//   });

//   const dates = Object.keys(summaryMap).sort();
//   const revenue = dates.map(d => summaryMap[d].revenue);
//   const expenses = dates.map(d => summaryMap[d].expenses);
//   const profit = dates.map((_, i) => revenue[i] - expenses[i]);

//   return { dates, revenue, expenses, profit };
// };

// ------------------------------------------------------------
import { crewCosts } from '@data/crewData';
// Helper function to calculate total daily crew cost
export const calculateDailyCost = (crewMembers = {}) => {
  if (!crewMembers || typeof crewMembers !== 'object') return 0;

  return (
    (crewMembers.botanist || 0) * crewCosts.botanist.daily +
    (crewMembers.cleaner || 0) * crewCosts.cleaner.daily +
    (crewMembers.handler || 0) * crewCosts.handler.daily +
    (crewMembers.chemist || 0) * crewCosts.chemist.daily
  );
};

// console.log("Loaded crewCosts:", JSON.stringify(crewCosts, null, 2));
//  export const calculateDailyCost = (crewMembers = {}) => {
//   console.log("crewMembers:", crewMembers);
//   console.log("crewCosts inside function:", crewCosts);
//   console.log("Per-role:", {
//   botanist: crewMembers.botanist * crewCosts.botanist?.daily,
//   cleaner: crewMembers.cleaner * crewCosts.cleaner?.daily,
//   handler: crewMembers.handler * crewCosts.handler?.daily,
//   chemist: crewMembers.chemist * crewCosts.chemist?.daily,
// })
//     return (
//     (crewMembers.botanist ?? 0) * (crewCosts.botanist?.daily ?? 0) +
//     (crewMembers.cleaner ?? 0) * (crewCosts.cleaner?.daily ?? 0) +
//     (crewMembers.handler ?? 0) * (crewCosts.handler?.daily ?? 0) +
//     (crewMembers.chemist ?? 0) * (crewCosts.chemist?.daily ?? 0)
//   );
//   };

// Prepare data for efficiency chart
export const getEfficiencyData = (dealerTransactions = [], dailySales = [], crew = {}) => {
  const byDate = {};

  // Dealer transactions
  dealerTransactions.forEach(tx => {
    const date = new Date(tx.date).toLocaleDateString();
    if (!byDate[date]) {byDate[date] = {date, revenue: 0, expenses: calculateDailyCost(crew), profit: 0}};
    byDate[date].revenue += tx.cashCollected || 0;
    byDate[date].profit = byDate[date].revenue - byDate[date].expenses;
  });

  // Daily personal sales
  dailySales.forEach(sale => {
    const date = new Date(sale.date).toLocaleDateString();
    if (!byDate[date]) {byDate[date] = {date, revenue: 0, expenses: calculateDailyCost(crew), profit: 0}};
    byDate[date].revenue += sale.amount || 0;
    byDate[date].expenses += sale.expenses || 0;
    byDate[date].profit = byDate[date].revenue - byDate[date].expenses;
  });

  // Return sorted array
  return Object.values(byDate).sort((a, b) => new Date(a.date) - new Date(b.date));
};

// Calculate overall efficiency score (0-100) - higher is better
export const calculateEfficiencyScore = (dealers = [], dealerTransactions = [], dailySales = [], crew = {}) => {
  // If both sources are empty, neutral score
  if (dealerTransactions.length === 0 && dailySales.length === 0) return 100;

  // Safely sum revenue
  const totalRevenue = [...dealerTransactions, ...dailySales].reduce((sum, tx) => {
    const value = tx.cashCollected ?? tx.amount ?? tx.totalRevenue ?? 0;
    return sum + (typeof value === 'number' ? value : 0);
  }, 0);

  // Calculate expenses
  const crewCost = typeof calculateDailyCost === 'function' ? calculateDailyCost(crew) : 0;
  const amortizedDealerBuyin = (dealers?.filter(d => d.active).reduce((sum, d) => sum + (d.buyin || 0), 0) || 0) / 30;
  const additionalExpenses = dailySales.reduce((sum, s) => sum + (s.expenses || 0), 0);

  const totalExpenses = crewCost * 30 + additionalExpenses + amortizedDealerBuyin;

  // Prevent division issues
  if (totalExpenses <= 0) return 100;
  if (totalRevenue <= 0) return 0;

  // ROI logic
  const roi = Math.min(((totalRevenue - totalExpenses) / totalExpenses) * 100, 100);

  console.log("REVENUE", totalRevenue);
  console.log("EXPENSES", totalExpenses);
  console.log("RAW ROI", ((totalRevenue - totalExpenses) / totalExpenses) * 100);

  return Math.max(0, Math.round(roi));
};

