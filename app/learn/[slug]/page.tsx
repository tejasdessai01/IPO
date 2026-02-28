import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { LEARN_ARTICLES, SITE_URL } from '@/lib/constants';
import { generateBreadcrumbJsonLd } from '@/lib/seo';

interface PageProps {
  params: { slug: string };
}

const articleContent: Record<string, string> = {
  'how-to-apply-for-ipo': `
## How to Apply for IPO in India

Applying for an IPO (Initial Public Offering) in India has become much simpler with the introduction of UPI-based applications. Here's a complete guide:

### Prerequisites
- A Demat account with any broker (Zerodha, Groww, Upstox, etc.)
- A linked bank account with UPI enabled
- PAN card linked to your Demat account

### Method 1: Apply Through Your Broker App
1. **Open your broker app** (Zerodha Kite, Groww, Upstox Pro)
2. **Go to IPO section** — Usually found under "IPO" or "New Issues"
3. **Select the IPO** you want to apply for
4. **Enter the number of lots** — Minimum 1 lot (retail investors can apply for up to ₹2,00,000)
5. **Enter the bid price** — For retail investors, select "Cut-off" price
6. **Enter your UPI ID** — Your UPI ID linked to your bank account
7. **Submit the application**
8. **Approve the mandate** on your UPI app (Google Pay, PhonePe, etc.)

### Method 2: Apply Through Net Banking (ASBA)
1. Log in to your net banking portal
2. Go to "IPO Application" or "ASBA" section
3. Select the IPO and fill in the application details
4. Submit — the amount will be blocked in your account (not debited)

### Important Points
- **Cut-off price**: Always bid at cut-off for best allotment chances
- **Multiple applications**: Only one application per PAN is allowed
- **Block amount**: Money is blocked, not debited. It's released if you don't get allotment
- **Timing**: Apply during IPO open period (usually 3 days)
- **UPI mandate**: You must approve the UPI mandate within the timeline, or your application will be rejected

### After Application
1. Wait for the allotment date (usually 6-7 days after close)
2. Check allotment status on the registrar's website
3. If allotted, shares will appear in your Demat account
4. If not allotted, blocked amount will be released back to your bank account
  `,

  'what-is-gmp-in-ipo': `
## What is GMP in IPO?

GMP stands for **Grey Market Premium**. It is the premium at which IPO shares are traded in the unofficial market (grey market) before the IPO's official listing on the stock exchange.

### How Does GMP Work?
- The grey market operates outside the regulatory framework of SEBI and stock exchanges
- Traders buy and sell IPO applications and allotments before listing
- The premium reflects market sentiment and expected listing gains
- GMP can be positive (expected profit) or negative (expected loss)

### Example
If an IPO has a price band of ₹100 and the GMP is ₹25:
- **Expected listing price** = ₹100 + ₹25 = ₹125
- **Expected listing gain** = 25%

### How to Read GMP
- **High positive GMP**: Strong demand, expected premium listing
- **Low or zero GMP**: Lukewarm interest, may list around issue price
- **Negative GMP**: Weak demand, may list at a discount

### Should You Rely on GMP?
**No, not entirely.** Here's why:
- GMP is from an unregulated market with no transparency
- It can change rapidly based on market conditions
- Large GMP fluctuations can happen on listing day
- It doesn't consider company fundamentals

### GMP vs Actual Listing
Studies show GMP is directionally correct about 70-75% of the time, but the magnitude can vary significantly. Always combine GMP analysis with:
- Company fundamentals
- Subscription data
- Market conditions
- Peer valuations
  `,

  'ipo-allotment-process-explained': `
## IPO Allotment Process Explained

Understanding how IPO shares are allotted helps set realistic expectations and improve your chances.

### The Allotment Process

#### Step 1: Application Collection
- All valid applications are collected after the IPO closes
- Invalid applications (duplicate PAN, incorrect details) are rejected

#### Step 2: Categorization
Applications are grouped into three categories:
1. **RII (Retail Individual Investors)**: Investment up to ₹2,00,000
2. **NII (Non-Institutional Investors)**: Investment above ₹2,00,000
3. **QIB (Qualified Institutional Buyers)**: Mutual funds, banks, FIIs

#### Step 3: Allotment Ratio
- **RII**: Minimum 35% of total shares reserved
- **NII**: Minimum 15% reserved
- **QIB**: Maximum 50% reserved

#### Step 4: The Lottery System (for Retail)
If an IPO is oversubscribed in the retail category:
- Each applicant gets maximum 1 lot (if oversubscribed less than total applicants)
- If more applicants than available lots, a computerized lottery determines winners
- Winners get exactly 1 lot, losers get nothing

#### Step 5: NII Allotment
- Proportional allotment based on application size
- Larger applications get more shares proportionally

### Tips to Improve Allotment Chances
1. **Apply from multiple Demat accounts** — Each family member can apply separately
2. **Always bid at cut-off price** — Ensures you're considered at final price
3. **Apply for minimum lot size** — In lottery system, all applicants have equal chance
4. **Apply early** — Avoid technical issues on the last day
5. **Ensure sufficient funds** — Application rejected if funds aren't available
  `,

  'how-to-check-ipo-allotment-status': `
## How to Check IPO Allotment Status

After an IPO closes, the allotment is typically finalized within 6-7 working days. Here's how to check:

### Method 1: BSE Website
1. Visit BSE Allotment Status page
2. Select "Equity" as issue type
3. Select the IPO from the dropdown
4. Enter your Application Number or PAN
5. Click "Search" to view your allotment status

### Method 2: Registrar Website
Each IPO has a designated registrar. Common registrars:

- **KFintech**: For IPOs registered with KFin Technologies
- **Link Intime**: For IPOs registered with Link Intime India
- **Bigshare Services**: For select IPOs

### Method 3: Your Broker App
Most brokers show allotment status directly:
- Zerodha: Console → IPO section
- Groww: Orders → IPO section
- Upstox: IPO → My Applications

### What the Status Means
- **Allotted**: Shares will be credited to your Demat account
- **Not Allotted**: Blocked funds will be released
- **Application not found**: Check PAN/application number

### Important Dates
- **Allotment date**: Usually 6 days after IPO close
- **Refund/Unblock**: 1-2 days after allotment
- **Credit to Demat**: 1-2 days after allotment
- **Listing**: Usually 3 days after allotment (T+3)
  `,

  'ipo-vs-fpo': `
## IPO vs FPO: What's the Difference?

Both IPO and FPO are ways companies raise capital from the public, but they differ in key ways.

### IPO (Initial Public Offering)
- **First time** a company offers shares to the public
- Company transitions from private to publicly listed
- Usually generates significant investor interest
- Higher risk as there's limited public market data
- Often priced at a premium for growth expectations

### FPO (Follow-on Public Offering)
- **Subsequent offering** by an already listed company
- Company is already trading on the stock exchange
- Can be dilutive (new shares) or non-dilutive (existing shares)
- Lower risk as market data is available
- Usually priced at a discount to current market price

### Key Differences

| Feature | IPO | FPO |
|---------|-----|-----|
| First offering? | Yes | No |
| Company status | Private → Public | Already Public |
| Risk level | Higher | Lower |
| Price discovery | Based on demand | Market price reference |
| Investor interest | Usually high | Moderate |
| Information available | Limited | Extensive |

### Types of FPO
1. **Dilutive FPO**: Company issues new shares, increasing total shares
2. **Non-dilutive FPO**: Existing shareholders sell their shares
3. **At-the-Market (ATM)**: Shares sold at prevailing market price

### Which is Better for Investors?
- **IPO**: Higher potential returns but higher risk
- **FPO**: More predictable but lower listing gains
- Both require thorough analysis of company fundamentals
  `,

  'best-demat-accounts-for-ipo': `
## Best Demat Accounts for IPO in India

Choosing the right demat account can significantly impact your IPO application experience. Here are the top options:

### 1. Zerodha
- **Account opening**: Free
- **AMC**: ₹300/year
- **IPO application**: Simple, through Console
- **UPI mandate**: Seamless
- **Pros**: Largest broker, reliable platform, good UI
- **Cons**: No advisory services

### 2. Groww
- **Account opening**: Free
- **AMC**: Free
- **IPO application**: Very simple, beginner-friendly
- **UPI mandate**: One-tap approval
- **Pros**: Free account, great mobile app, instant KYC
- **Cons**: Limited research tools

### 3. Upstox
- **Account opening**: Free
- **AMC**: Free
- **IPO application**: Easy through app
- **Pros**: Free account, fast IPO processing
- **Cons**: Occasional app stability issues

### 4. Angel One
- **Account opening**: Free
- **AMC**: ₹240/year (waived with trading)
- **IPO application**: Good interface
- **Pros**: Strong research, advisory services
- **Cons**: AMC charges

### 5. HDFC Securities
- **Account opening**: ₹999
- **AMC**: ₹750/year
- **IPO application**: Through net banking (ASBA)
- **Pros**: Bank-backed reliability, ASBA facility
- **Cons**: Higher charges

### Tips for IPO Success
1. **Open multiple demat accounts** — Each family member should have one
2. **Link UPI** — Ensure UPI is active and linked properly
3. **Keep funds ready** — Have sufficient balance before IPO opens
4. **Apply on Day 1** — Avoid last-minute technical issues
5. **Use cut-off price** — Always bid at cut-off for retail category

### How to Open a Demat Account
1. Visit the broker's website/app
2. Complete KYC with PAN, Aadhaar, and bank details
3. E-sign documents
4. Account activated within 24-48 hours
5. Link UPI for IPO applications
  `,
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = LEARN_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) return { title: 'Article Not Found' };

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: `${article.title} | IPO Dekho`,
      description: article.description,
      url: `${SITE_URL}/learn/${article.slug}`,
    },
    keywords: article.keywords,
  };
}

export default function LearnArticlePage({ params }: PageProps) {
  const article = LEARN_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const content = articleContent[params.slug];
  if (!content) notFound();

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Learn', url: '/learn' },
    { name: article.title, url: `/learn/${article.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <nav className="mb-6 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-indigo-500">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/learn" className="hover:text-indigo-500">Learn</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-gray-900 dark:text-white">{article.title}</span>
        </nav>

        <Card>
          <CardContent className="p-6 sm:p-8">
            <article className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-semibold prose-h2:text-2xl prose-h3:text-lg prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-li:text-gray-600 dark:prose-li:text-gray-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-a:text-indigo-600 dark:prose-a:text-indigo-400">
              <div
                dangerouslySetInnerHTML={{
                  __html: simpleMarkdownToHtml(content),
                }}
              />
            </article>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link href="/learn" className="text-sm text-indigo-500 hover:text-indigo-600 dark:text-indigo-400">
            &larr; Back to All Articles
          </Link>
        </div>
      </div>
    </>
  );
}

function simpleMarkdownToHtml(md: string): string {
  return md
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^\- (.*$)/gm, '<li>$1</li>')
    .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => {
      return `<ul>${match}</ul>`;
    })
    .replace(/\|(.*)\|/g, (match) => match)
    .replace(/^(?!<[hul])(.*\S.*)$/gm, '<p>$1</p>')
    .replace(/<p>\|.*\|<\/p>/g, (match) => match.replace(/<\/?p>/g, ''))
    .replace(/\n{2,}/g, '\n');
}
