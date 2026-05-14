import { NextResponse } from "next/server";
import axios from "axios";
import ExcelJS from "exceljs";
import { API_BASE_URL } from "@/utils/envHere";

export async function GET() {
  try {
    
    const { data: products } = await axios.get(`${API_BASE_URL}/api/products/get-all-product`);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Product Feed");

    
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

    products.forEach((p: any) => {
      
      const totalQty = p.inventory?.reduce((sum: number, i: any) => sum + (i.quantity || 0), 0);
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
     
    const buffer = await workbook.xlsx.writeBuffer();


    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=product-feed.xlsx",
      },
    });
  } catch (error) {
  
    return NextResponse.json({ error: "Failed to generate feed" }, { status: 500 });
  }
}
