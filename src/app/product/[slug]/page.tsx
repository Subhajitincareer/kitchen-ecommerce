import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import PDPClientWrapper from '@/components/product/PDPClientWrapper';
import ProductFeatures from '@/components/product/ProductFeatures';
import ProductDescription from '@/components/product/ProductDescription';
import ProductSpecifications from '@/components/product/ProductSpecifications';
import ProductReviews from '@/components/product/ProductReviews';
import ProductQuestions from '@/components/product/ProductQuestions';
import RelatedProducts from '@/components/product/RelatedProducts';
import { Metadata } from 'next';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Ensure dynamic rendering handles the mock DB safely
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.id === slug);
  if (!product) return { title: 'Product Not Found - Kitchora' };

  return {
    title: `${product.name} | Kitchora`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.id === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-surface">
      {/* Breadcrumbs */}
      <div className="bg-surface-container py-3">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-xs font-medium text-on-surface-variant overflow-x-auto whitespace-nowrap scrollbar-hide">
            <a href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">home</span>
              Home
            </a>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <a href={`/category/${product.category}`} className="hover:text-primary transition-colors capitalize">
              {product.category}
            </a>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-on-surface font-bold truncate max-w-[200px] md:max-w-none">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      <div className="container-custom pt-6 pb-24 md:pb-12">
        {/* Top Fold (Gallery + Buy Box via Client Wrapper for interactivity) */}
        <PDPClientWrapper product={product} />

        {/* Below the Fold Server Components */}
        <div className="max-w-5xl">
          <ProductFeatures features={product.features} />
          <ProductDescription description={product.description} />
          <ProductSpecifications specifications={product.specifications} />
          <ProductQuestions faqs={product.faqs} />
          <ProductReviews 
            reviews={product.reviews} 
            rating={product.rating} 
            reviewsCount={product.reviewsCount} 
          />
        </div>
      </div>
      
      {/* Related Products - Full Width Background */}
      <div className="bg-surface-container border-t border-outline-variant">
        <div className="container-custom">
          <RelatedProducts currentProductId={product.id} category={product.category} />
        </div>
      </div>
    </div>
  );
}
