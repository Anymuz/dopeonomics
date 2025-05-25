export function calculateTotalEarnings(member) {
  if (!member.transactions || !Array.isArray(member.transactions)) return 0;
  return member.transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
};

export function calculateTransactionCount(member) {
  if (!member.transactions || !Array.isArray(member.transactions)) return 0;
  return member.transactions.length;
};

export function calculateRoleStats(crew = []) {
  const roleStats = {};

  crew.forEach(member => {
    const role = member.role || 'Unassigned';
    if (!roleStats[role]) {
      roleStats[role] = {
        count: 0,
        totalEarnings: 0,
        transactionCount: 0,
      };
    }

    roleStats[role].count += 1;
    roleStats[role].totalEarnings += calculateTotalEarnings(member);
    roleStats[role].transactionCount += calculateTransactionCount(member);
  });

  return roleStats;
};

export function summarizeTransactions(transactions = []) {
  if (!Array.isArray(transactions)) return { dates: [], revenue: [], expenses: [], profit: [] };

  const summaryMap = {};

  transactions.forEach(tx => {
    const date = tx.date || 'Unknown';
    if (!summaryMap[date]) summaryMap[date] = { revenue: 0, expenses: 0 };
    if (tx.type === 'sale') summaryMap[date].revenue += tx.amount || 0;
    if (tx.type === 'expense') summaryMap[date].expenses += tx.amount || 0;
  });

  const dates = Object.keys(summaryMap).sort();
  const revenue = dates.map(d => summaryMap[d].revenue);
  const expenses = dates.map(d => summaryMap[d].expenses);
  const profit = dates.map((_, i) => revenue[i] - expenses[i]);

  return { dates, revenue, expenses, profit };
};
