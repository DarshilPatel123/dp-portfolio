const content = {
  about: {
    label: 'Notes / About',
    title: 'Thoughtful software starts with people.',
    copy: 'A portfolio interaction should make information easier to discover, not turn it into a puzzle. This station introduces the person behind the work.'
  },
  skills: {
    label: 'Terminal / Strengths',
    title: 'Clear thinking is a practical tool.',
    copy: 'This station can become an expressive way to share development strengths, technologies, and the principles that guide each decision.'
  },
  experience: {
    label: 'Build board / Experience',
    title: 'Work in progress, since 2023.',
    copy: 'Veloxocre is the current professional chapter. The final version will use approved résumé details, with no invented job description.'
  },
  projects: {
    label: 'Project folder / New work',
    title: 'The next case studies belong here.',
    copy: 'This is reserved for new portfolio projects we will create and document together—not older projects copied in as filler.'
  }
};

const label = document.querySelector('[data-detail-label]');
const title = document.querySelector('[data-detail-title]');
const copy = document.querySelector('[data-detail-copy]');
const details = document.querySelector('#workspace-details');

document.querySelectorAll('[data-station]').forEach((station) => {
  station.addEventListener('click', () => {
    const selected = content[station.dataset.station];
    if (!selected || !label || !title || !copy) return;

    label.textContent = selected.label;
    title.textContent = selected.title;
    copy.textContent = selected.copy;
    document.querySelectorAll('[data-station]').forEach((item) => item.setAttribute('aria-pressed', 'false'));
    station.setAttribute('aria-pressed', 'true');
    details?.focus({ preventScroll: true });
  });
});
