import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { HairExtensionsandWigs } from '@/entities';

export default function DebugProductImages() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get all products to find Double Piece Flat Weft
        const allProducts = await BaseCrudService.getAll<HairExtensionsandWigs>(
          'hairextensions',
          {},
          { limit: 100 }
        );

        // Get specific products by ID
        const product1 = await BaseCrudService.getById<HairExtensionsandWigs>(
          'hairextensions',
          'af7eb76e-51cc-4949-bf30-ef2a66c74181'
        );

        const product2 = await BaseCrudService.getById<HairExtensionsandWigs>(
          'hairextensions',
          'f52c9675-ed70-4493-9f2f-3e0b1c0164c8'
        );

        // Find Double Piece Flat Weft
        const doublePiece = allProducts.items.find(p => 
          p.itemName?.toLowerCase().includes('double piece flat weft') ||
          p.productType?.toLowerCase().includes('double piece flat weft') ||
          p.applicationMethod?.toLowerCase().includes('double piece flat weft')
        );

        setData({
          doublePiece: doublePiece,
          virginBrazilian: product1,
          ombreBalayage: product2,
          allProducts: allProducts.items.slice(0, 20)
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setData({ error: String(error) });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 bg-white">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
