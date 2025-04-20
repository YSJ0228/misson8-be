import { PrismaClient } from '@prisma/client';
import { ArticleMocks } from './mocks/articleMocks.js';
import { ProductMocks } from './mocks/productMocks.js';
import { CommentMocks } from './mocks/comments.js';

const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 삭제 (순서: 댓글 → 게시글 → 상품)
  await prisma.comment.deleteMany();
  await prisma.article.deleteMany();
  await prisma.product.deleteMany();

  // Article 생성 (ID 추적)
  const createdArticles = [];
  for (const article of ArticleMocks) {
    const created = await prisma.article.create({ data: article });
    createdArticles.push(created);
  }

  // Product 생성 (ID 추적)
  const createdProducts = [];
  for (const product of ProductMocks) {
    const created = await prisma.product.create({ data: product });
    createdProducts.push(created);
  }

  // Comment 생성 (실제 ID 매핑)
  for (const comment of CommentMocks) {
    const data = {
      content: comment.content,
    };

    if (comment.articleId) {
      const articleIndex = comment.articleId - 1;
      if (createdArticles[articleIndex]) {
        data.articleId = createdArticles[articleIndex].id;
      }
    }

    if (comment.productId) {
      const productIndex = comment.productId - 1;
      if (createdProducts[productIndex]) {
        data.productId = createdProducts[productIndex].id;
      }
    }

    await prisma.comment.create({ data });
  }
}

main()
  .then(async () => {
    console.log('✅ Seeding completed');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
