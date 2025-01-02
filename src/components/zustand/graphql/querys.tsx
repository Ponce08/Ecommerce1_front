import { gql } from '@apollo/client';

// Query de Apollo para obtener productos
export const GET_PRODUCTS = gql`
  query GetProducts($page: Int, $category: String, $priceMin: Float, $priceMax: Float, $ratingOrder: String) {
    products(page: $page, category: $category, priceMin: $priceMin, priceMax: $priceMax, ratingOrder: $ratingOrder) {
      id
      title
      images
      category
      price
      rating
    }
  }
`;

// Query de Apollo para obtener productos por ID
export const GET_PRODUCTS_BY_ID = gql`
  query GetProductById($id: Int!) {
    getProductById(id: $id) {
      id
      title
      description
      price
      category
      rating
      stock
      reviews {
        comment
        reviewerName
        reviewerEmail
        rating
      }
      images
    }
  }
`;
