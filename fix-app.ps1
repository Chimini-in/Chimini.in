$appJsPath = "c:\Users\user\Downloads\Harshida\Chimini\app.js"
$content = Get-Content -Path $appJsPath -Raw

$searchStr = "    const campaignSubtitle = document.getElementById('campaignSubtitle');"

$insertStr = @"
    
    if (campaignBannerImg) campaignBannerImg.src = banners.campaignBanner.image;
    if (campaignBannerLink) campaignBannerLink.href = banners.campaignBanner.link;
    if (campaignTitle) campaignTitle.textContent = banners.campaignBanner.title;
    if (campaignSubtitle) campaignSubtitle.textContent = banners.campaignBanner.subtitle;

    // Brand Story Banner
    const storyBannerImg = document.getElementById('storyBannerImg');
    const storyBannerLink = document.getElementById('storyBannerLink');
    const storyTitle = document.getElementById('storyTitle');
    const storyDesc = document.getElementById('storyDesc');
    
    if (storyBannerImg) storyBannerImg.src = banners.storyBanner.image;
    if (storyBannerLink) storyBannerLink.href = banners.storyBanner.link;
    if (storyTitle) storyTitle.textContent = banners.storyBanner.title;
    if (storyDesc) storyDesc.textContent = banners.storyBanner.desc;
  }

  // 7. Render Customer Testimonials
  const testimonials = JSON.parse(localStorage.getItem('chimini_testimonials'));
  const testimonialsContainer = document.getElementById('testimonialsContainer');
  const testimonialsDots = document.getElementById('testimonialsDots');
  if (testimonialsContainer && testimonials) {
    testimonialsContainer.innerHTML = testimonials.map((test, index) => ``
      <div class="testimonial-card">
        <p class="testimonial-text">`${test.text}</p>
        <span class="testimonial-author">&mdash; `${test.author}</span>
      </div>
    ``).join('');

    if (testimonialsDots) {
      testimonialsDots.innerHTML = testimonials.map((_, index) => ``
        <button class="testimonial-dot `${index === 0 ? 'active' : ''}" data-testimonial="`${index}" aria-label="Go to testimonial `${index + 1}"></button>
      ``).join('');
    }
  }
}

/* ==========================================================================
   STICKY HEADER SCROLL LOGIC
   ========================================================================== */

function initHeaderScroll() {
  const header = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
"@

$content = $content -replace [regex]::Escape($searchStr), ($searchStr + "`n" + $insertStr)

Set-Content -Path $appJsPath -Value $content -NoNewline
