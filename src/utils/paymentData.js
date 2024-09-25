const paymentData = Array.from({ length: 40 }, (_, index) => ({
    id: index + 1,
    tenantName: `Tenant ${index + 1}`,
    image: [
        "/static/images/couple.png",
        "/static/images/coverPhoto.png",
        "/static/images/daddy&Son.png"
    ][Math.floor(Math.random() * 3)],
    rentAmount: `${(Math.random() * (5000000 - 1000000) + 1000000).toFixed(0)}`,
    dueDate: `${Math.floor(Math.random() * 28) + 1}th ${["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][Math.floor(Math.random() * 12)]}, 2024`,
    paymentStatus: Math.random() > 0.5 ? "Paid" : "Unpaid",
    amountPaid: `${(Math.random() * (5000000 - 1000000) + 1000000).toFixed(0)}`,
    description: Math.random() > 0.5 ? "Full Payment" : "Part Payment",
    rentDuration: `${Math.floor(Math.random() * 3) + 1} Years`,
    paymentMethod: Math.random() > 0.5 ? "Offline (Transfer)" : "Wallet",
    estateName: `Estate ${index + 1}`,
    paymentDate: `${Math.floor(Math.random() * 28) + 1}th ${["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][Math.floor(Math.random() * 12)]}, 2024`,
}));

export default paymentData;
