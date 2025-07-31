export function generateExpenses(count) {
    const properties = ["Sunrise Apartments", "Ocean View Villa", "Mountain Heights", "Green Valley Residences", "Downtown Lofts"];
    const categories = ["Maintenance", "Utilities", "Repairs", "Cleaning", "Security"];
    const statuses = ["Paid", "Unpaid"];
    const paymentMethods = ["Bank Transfer", "Cash", "Cheque", "Online Payment"];
    const vendors = ["Exquisite Electrical", "Premium Plumbing", "Elite Maintenance", "Top Cleaners", "Secure Systems"];
    const contacts = ["Samuel David", "James Wilson", "Sarah Johnson", "Michael Brown", "Emily Davis"];
    const apartments = ["A1", "B2", "C3", "D4", "E5"];
    const tenants = ["John Smith", "Emma Watson", "Robert Downey", "Chris Evans", "Scarlett Johansson"];
    const services = ["CCTV Installation", "Plumbing Repair", "Deep Cleaning", "Electrical Wiring", "Painting"];
    const date = ["28th Feb, 2025", "8th Mar, 2025", "26th Feb, 2025", "15th Feb, 2025"]
    const expenses = [];

    for (let i = 1; i <= count; i++) {
        const property = properties[Math.floor(Math.random() * properties.length)];
        const vendor = vendors[Math.floor(Math.random() * vendors.length)];
        const contact = contacts[Math.floor(Math.random() * contacts.length)];

        expenses.push({
            _id: `expense_${i.toString().padStart(3, '0')}`,
            expenses: services[Math.floor(Math.random() * services.length)],
            amount: Math.floor(Math.random() * 21 + 20) * 1000,
            category: categories[Math.floor(Math.random() * categories.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            date: date[Math.floor(Math.random() * date.length)],
            property: property,
            vendorName: vendor,
            contactPerson: contact,
            vendorEmail: `${vendor.toLowerCase().replace(/\s/g, '')}@gmail.com`,
            vendorPhone: `070${Math.floor(Math.random() * 9000000 + 1000000)}`,
            businessAddress: `${Math.floor(Math.random() * 100) + 1} ${property.split(' ')[0]} Plaza, Lagos`,
            paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
            apartment: apartments[Math.floor(Math.random() * apartments.length)],
            tenantName: tenants[Math.floor(Math.random() * tenants.length)],
            description: `${services[Math.floor(Math.random() * services.length)]} & Maintenance`
        });
    }

    return expenses;
}
