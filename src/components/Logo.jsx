import { logoPath } from '../config/site';

export default function Logo({ className = '', loading = 'eager', fetchPriority }) {
  return (
    <span className={`logo-container ${className}`.trim()}>
      <img
        src={logoPath}
        alt="Mr.IT Support — robot mascot and official wordmark"
        width="938"
        height="741"
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
      />
    </span>
  );
}
