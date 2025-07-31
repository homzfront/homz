const generateMonthlyStats = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();
  const years = [
    currentYear,
    currentYear - 1,
    currentYear - 2,
    currentYear - 3,
    currentYear - 4,
  ];

  return months.map((month, index) => {
    // Generate stats for each month across 5 years
    const stats = years.flatMap((year) => {
      const baseDate = `${year}-${String(index + 1).padStart(2, "0")}-01`;

      // Generate random but realistic data with seasonal variations
      const seasonalMultiplier = 0.8 + Math.sin(index * 0.5) * 0.3; // Creates seasonal pattern
      const yearlyDecay = 0.9 + (currentYear - year) * 0.05; // Slightly less traffic for older years

      const views = Math.floor(
        (50 + Math.random() * 150) * seasonalMultiplier * yearlyDecay
      );
      const clicks = Math.floor(views * (0.2 + Math.random() * 0.3));
      const whatsapp = Math.floor(clicks * (0.1 + Math.random() * 0.2));

      return {
        date: baseDate,
        views,
        clicks,
        whatsapp,
      };
    });

    return {
      id: index + 1,
      name: month,
      stats,
    };
  });
};

const monthlyPropertyStats = generateMonthlyStats();
export default monthlyPropertyStats;
