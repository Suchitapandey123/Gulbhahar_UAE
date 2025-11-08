import { NextResponse } from "next/server";
import axios from "axios";
import ExcelJS from "exceljs";

export async function GET() {
  try {
    // Fetch product data
    const { data: products } = await axios.get("https://api.gulbhahar.com/api/products/get-all-product");

    // Create Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Product Feed");
 
    // Define columns
    worksheet.columns = [
      { header: "id", key: "id" },
      { header: "title", key: "title" },
      { header: "description", key: "description" },
      { header: "availability", key: "availability" },
      { header: "condition", key: "condition" },
      { header: "price", key: "price" },
      { header: "link", key: "link" },
      { header: "image_link", key: "image_link" },
      { header: "brand", key: "brand" },
    ];

    // Fill rows
    products.forEach((p) => {
      const totalQty = p.inventory?.reduce((sum, i) => sum + (i.quantity || 0), 0);
      const availability = totalQty > 0 ? "in stock" : "out of stock";

      worksheet.addRow({
        id: p.productId,
        title: p.name,
        description:  p.overview?.[0] || p.title || "",
        availability,
        condition: "new",
        price: `${p.price} INR`,
        link: `https://www.gulbhahar.com/products/${p.productId}`,
        image_link: p.images?.[0]?.[0] || "",
        brand: "GULBHAHAR",
      });
    });
     
    // Convert workbook to buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Return Excel file as response
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=product-feed.xlsx",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate feed" }, { status: 500 });
  }
}
