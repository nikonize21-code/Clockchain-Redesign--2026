/* ============================================================
   Clockchain — News & Media article modal
   Replicates the original site's in-page article reader.
   Article URLs can be added to the `external` field when known.
   ============================================================ */

(function () {
  'use strict';

  const ARTICLES = {
    // ===== Press Releases (chronological, newest first) =====
    'pr-testnet-2026': {
      source: 'Press Release',
      date: 'February 24, 2026',
      tag: 'Latest release',
      title: 'Clockchain Opens Public Testnet, Introducing a New Blockchain Based Global Time Standard',
      external: 'https://www.blockchainwire.io/press-release/clockchain-opens-public-testnet-introducing-a-new-blockchain-based-global-time-standard',
      body: `
        <p>The Clockchain Network has completed development of the world's first
        blockchain-based time oracle and opened its public testnet to developers
        worldwide — introducing a new global standard for verifiable time.</p>

        <p>Read the full release on Blockchain Wire →</p>
      `
    },

    'pr-eth-polygon-2025': {
      source: 'Press Release',
      date: 'June 3, 2025',
      tag: 'Product release',
      title: 'Clockchain to Schedule and Execute Smart Contracts on Ethereum and Polygon',
      external: 'https://www.einpresswire.com/article/818495889/clockchain-to-schedule-and-execute-smart-contracts-on-ethereum-and-polygon',
      body: `
        <p>Clockchain announces smart contract scheduling and execution on Ethereum and
        Polygon — using verifiable blockchain time as the trigger for on-chain actions.</p>

        <p>Read the full release on EIN Presswire →</p>
      `
    },

    'pr-time-oracle-2025': {
      source: 'Press Release',
      date: 'January 22, 2025',
      tag: 'Product release',
      title: 'Clockchain Network Announces New Time Oracle',
      external: 'https://www.einpresswire.com/article/778900186/clockchain-network-announces-new-time-oracle',
      body: `
        <p>The Clockchain Network announces its new Time Oracle, delivering precise,
        tamper-evident time data to blockchain applications and smart contracts.</p>

        <p>Read the full release on EIN Presswire →</p>
      `
    },

    'pr-sf-tech-week-2024': {
      source: 'Press Release',
      date: 'October 16, 2024',
      tag: 'Event',
      title: 'Clockchain Network Unveils New Timestamping Solutions at SF Tech Week',
      external: 'https://www.einpresswire.com/article/752264416/clockchain-network-unveils-new-timestamping-solutions-at-sf-tech-week',
      body: `
        <p>At SF Tech Week, Clockchain Network unveiled its new timestamping solutions —
        bringing verifiable, blockchain-anchored timestamps to enterprise and Web3
        applications.</p>

        <p>Read the full release on EIN Presswire →</p>
      `
    },

    'pr-patent-2024': {
      source: 'Press Release',
      date: 'August 13, 2024',
      tag: 'Milestone',
      title: 'Clockchain Awarded Patent for World’s First Blockchain Clock',
      external: 'https://www.einpresswire.com/article/732597207/clockchain-awarded-patent-for-world-s-first-blockchain-clock',
      body: `
        <p>Clockchain has been awarded a patent for the world's first blockchain clock —
        a foundational milestone for the company's mission to deliver a verifiable
        global time standard.</p>

        <p>Read the full release on EIN Presswire →</p>
      `
    },

    'pr-european-forum-2024': {
      source: 'Press Release',
      date: 'June 24, 2024',
      tag: 'Event',
      title: 'D4D Clockchain Technology Debuts at European Timekeeping Forum',
      external: 'https://www.prweb.com/releases/d4d-clockchain-technology-debuts-at-european-timekeeping-forum-302178744.html',
      body: `
        <p>D4D Clockchain technology made its public debut at the European Timekeeping
        Forum — introducing a blockchain-anchored approach to global time and
        timestamping to a community of metrology and precision-time experts.</p>

        <p>Read the full release on PRWeb →</p>
      `
    },

    // ===== Research / legacy entries =====
    'research-temporal-truth': {
      source: 'Clockchain Research',
      date: 'Feb 3, 2026',
      tag: 'Whitepaper',
      title: 'Cross-Knowledge Graph Assertion of Temporal Truth',
      external: null,
      body: `
        <p>Clockchain Research presents a formal framework for asserting the temporal validity
        of claims across disjoint knowledge graphs by anchoring assertions to a verifiable
        blockchain-based clock.</p>

        <h3>Abstract</h3>
        <p>In a world where data flows across hundreds of independent knowledge graphs —
        each with its own clock, provenance, and source of truth — a single shared
        notion of "when" becomes the missing primitive. This paper introduces
        <em>Cross-Knowledge Graph Assertion of Temporal Truth</em> (CKG-ATT), a protocol
        for issuing, recording, and verifying timestamp-bound claims that hold across
        graphs operated by mutually distrusting parties.</p>

        <h3>Contributions</h3>
        <ul>
          <li><strong>Temporal anchoring.</strong> Every assertion is bound to a Clockchain timestamp, producing a cross-graph commitment that is publicly auditable.</li>
          <li><strong>Cross-graph verification.</strong> A second graph can independently confirm the assertion's timing without trusting the originating graph.</li>
          <li><strong>Proof-of-Time consensus.</strong> A consensus extension that prevents back-dating, future-dating, and selective replay across graph boundaries.</li>
        </ul>

        <p>The full paper, including formal proofs and benchmark data from the Clockchain
        testnet, will be published as part of the Clockchain Research series.</p>
      `
    },

    'smart-contract-eth-polygon': {
      source: 'Clockchain',
      date: 'Jun 3, 2025',
      tag: 'Product update',
      title: 'Smart Contract Scheduling & Execution on Ethereum and Polygon',
      external: null,
      body: `
        <p>Clockchain is now able to schedule and execute smart contracts on Ethereum and
        Polygon — using verifiable blockchain time as the trigger.</p>

        <p>For the first time, developers can guarantee that a critical on-chain action
        will fire at a precise, globally consistent moment — independent of any
        centralized scheduler, off-chain cron job, or trusted relayer.</p>

        <h3>What's available today</h3>
        <ul>
          <li><strong>Scheduled execution.</strong> Pin a contract call to a future Clockchain timestamp; execution is guaranteed at or after that moment, with cryptographic proof of when.</li>
          <li><strong>Cross-chain triggers.</strong> A single Clockchain timestamp can drive actions on multiple destination chains in lockstep.</li>
          <li><strong>Audit trail.</strong> Every execution emits a verifiable record tying the on-chain effect back to the Clockchain Time Oracle.</li>
        </ul>

        <p>Ethereum and Polygon are the first two destinations. Additional chains are on
        the roadmap for the rest of 2025.</p>
      `
    },

    'blockzeit-testnet': {
      source: 'Blockzeit',
      date: 'Feb 24, 2026',
      tag: 'Featured coverage',
      title: 'Clockchain Launches Public Testnet — Here\u2019s What It Offers',
      external: 'https://blockzeit.com/clockchain-launches-public-testnet-heres-what-it-offers/',
      body: `
        <p>Clockchain, the time-focused blockchain network, has launched its public testnet,
        delivering the world's first verifiable blockchain-based time oracle.</p>

        <blockquote>
          There is an obvious need for a secure and globally consistent blockchain clock.
          <cite>Ken Yamada, CEO, Clockchain Network</cite>
        </blockquote>

        <p>The oracle is based on Clockchain's patented technology, which combines a
        physical network of the world's most accurate atomic clocks with the integrity
        and immutability of the blockchain. The result is a highly accurate and secure
        timekeeping and timestamping solution, accessible for data logging and asset
        authentication.</p>

        <h3>Three foundational services are now available</h3>
        <ul>
          <li><strong>Timestamp API</strong> — Verify and timestamp data every second from any device, anywhere in the world.</li>
          <li><strong>Data Logging &amp; Authentication</strong> — Log and record timestamp data onto the Clockchain for future authentication.</li>
          <li><strong>Smart Contract Scheduling &amp; Execution</strong> — Schedule and execute critical operations on Ethereum and Polygon, with additional chains coming soon.</li>
        </ul>

        <p>Clockchain has support from the Department of Economic Affairs of the Canton
        of Neuchâtel, and has been approved by FINMA, the Swiss Financial Market
        Supervisory Authority, to raise capital through a blockchain token sale.</p>
      `
    },

    'mexc-testnet': {
      source: 'MEXC',
      date: 'Feb 24, 2026',
      tag: 'Exchange coverage',
      title: 'Clockchain Unveils Testnet for Verifiable Blockchain Time',
      external: 'https://www.mexc.co/news/786064',
      body: `
        <p>MEXC reports on Clockchain's public testnet launch — the first blockchain-based
        time oracle to combine atomic-clock precision with on-chain verifiability.</p>

        <p>The testnet introduces a new primitive for Web3: a shared, tamper-evident clock
        that every contract, oracle, and application can rely on. Historical timestamp
        failures — including high-profile incidents in finance and crypto — have
        underscored the need for a secure, globally consistent blockchain clock.</p>

        <h3>What developers can build</h3>
        <ul>
          <li><strong>Verifiable timestamping</strong> for assets, documents, and on-chain events.</li>
          <li><strong>Scheduled smart contracts</strong> that fire at a precise, provable moment.</li>
          <li><strong>Cross-chain time coordination</strong> across Ethereum, Polygon, and additional networks on the roadmap.</li>
        </ul>

        <p>The Clockchain testnet is fully operational and running smoothly. A global
        launch with a simultaneous token generation event is on the horizon.</p>
      `
    },

    'blockchainwire-testnet': {
      source: 'Blockchain Wire',
      date: 'Feb 24, 2026',
      tag: 'Press release',
      title: 'Clockchain Opens Public Testnet — A New Blockchain-Based Global Time Standard',
      external: 'https://www.blockchainwire.io/press-release/clockchain-opens-public-testnet-introducing-a-new-blockchain-based-global-time-standard',
      body: `
        <p><strong>SAN FRANCISCO, CA — </strong>The Clockchain Network has completed
        development of the world's first blockchain-based time oracle and opened its
        public testnet to developers worldwide. The oracle generates time-data for both
        enterprise and the public, and is expected to play an important role in Web 3.0
        infrastructure development.</p>

        <blockquote>
          There is an obvious need for a secure and globally consistent blockchain clock —
          not only for the enhanced security it delivers, but also as a vital component of
          Web 3.0 infrastructure. The Clockchain Time Oracle sets new standards and raises
          the bar in this space.
          <cite>Ken Yamada, CEO, Clockchain Network</cite>
        </blockquote>

        <h3>About Clockchain</h3>
        <p>Clockchain is a blockchain-based system that leverages the immutable nature of
        blockchain ledgers to timestamp and authenticate user data, providing robust
        protection against falsification and forgery. The Clockchain test network is
        operational, and a global launch with a simultaneous token generation event is
        on the horizon.</p>

        <h3>About D4D Sàrl</h3>
        <p>D4D Sàrl is a time-focused blockchain technology company registered in
        Neuchâtel, Switzerland. Its mission is to create new standards for accuracy and
        security in timekeeping and timestamping, integrating these innovations into
        Web 3.0 applications.</p>
      `
    }
  };

  let lastFocus = null;

  function open(key) {
    const data = ARTICLES[key];
    if (!data) return;

    const modal = document.getElementById('articleModal');
    if (!modal) return;

    document.getElementById('ammSource').textContent = data.source;
    document.getElementById('ammDate').textContent = data.date;
    document.getElementById('ammTag').textContent = data.tag;
    document.getElementById('articleModalTitle').textContent = data.title;
    document.getElementById('articleModalContent').innerHTML = data.body;

    const ext = document.getElementById('ammExternal');
    if (data.external) {
      ext.href = data.external;
      ext.hidden = false;
    } else {
      ext.hidden = true;
    }

    lastFocus = document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    // scroll modal to top
    requestAnimationFrame(() => {
      modal.scrollTop = 0;
      const closeBtn = modal.querySelector('.article-modal-close');
      if (closeBtn) closeBtn.focus();
    });
  }

  function close() {
    const modal = document.getElementById('articleModal');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function init() {
    // Click on any press-card or pr-list-item opens its article
    document.querySelectorAll('[data-article]').forEach((el) => {
      el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'button');
      const key = el.getAttribute('data-article');
      const title = el.querySelector('h4, .pr-title')?.textContent || 'Read article';
      el.setAttribute('aria-label', title);

      el.addEventListener('click', () => {
        const article = ARTICLES[key];
        if (article && article.external) {
          window.open(article.external, '_blank', 'noopener,noreferrer');
        } else {
          open(key);
        }
      });
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const article = ARTICLES[key];
          if (article && article.external) {
            window.open(article.external, '_blank', 'noopener,noreferrer');
          } else {
            open(key);
          }
        }
      });
    });

    // Close handlers
    document.querySelectorAll('#articleModal [data-close]').forEach((el) => {
      el.addEventListener('click', close);
    });

    // Esc key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.getElementById('articleModal');
        if (modal && modal.classList.contains('open')) close();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // expose for later (e.g. to inject real URLs)
  window.ClockchainNews = { open, close, ARTICLES };
})();
