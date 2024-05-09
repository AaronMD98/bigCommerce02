import React from 'react';
import { BcImage } from '..';

export interface Product {
  entityId: number;
  name: string;
  defaultImage?: {
    altText?: string;
    url?: string;
  } | null;
  path: string;
  brand?: {
    name: string;
    path: string;
  } | null;
  prices?: {
    price?: {
      value?: number;
      currencyCode?: string;
    };
    basePrice?: {
      value?: number;
      currencyCode?: string;
    } | null;
    retailPrice?: {
      value?: number;
      currencyCode?: string;
    } | null;
    salePrice?: {
      value?: number;
      currencyCode?: string;
    } | null;
    priceRange?: {
      min?: {
        value?: number;
        currencyCode?: string;
      } | null;
      max?: {
        value?: number;
        currencyCode?: string;
      } | null;
    } | null;
  } | null;
  reviewSummary?: {
    numberOfReviews: number;
    averageRating: number;
  } | null;
  productOptions?: Array<{
    entityId: number;
  }>;
  images: any;
}

function BcImageHover<Product>(product) {
  if (!product) return;
  return (
    <BcImage
      alt={product.defaultImage.altText ?? product.name ?? ''}
      className="object-contain"
      fill
      priority={imagePriority}
      sizes="(max-width: 768px) 50vw, (max-width: 1536px) 25vw, 500px"
      src={product.defaultImage.url ?? ''}
      defaultImage={product.defaultImage.url}
      hoverImage={product.images.edges[1]}
    />
  );
}

export default BcImageHover;
