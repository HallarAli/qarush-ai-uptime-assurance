const columns = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Changelog", "Documentation"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security"],
  },
];

const Footer = () => (
  <footer className="border-t border-border/40 py-16">
    <div className="container-narrow">
      <div className="grid md:grid-cols-4 gap-10">
        <div>
          <span className="text-lg font-bold">
            <span className="text-gradient">Qarush</span>
            <span className="ml-1 font-medium">AI</span>
          </span>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            AI-powered website monitoring that catches broken flows before your users do.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border/40 mt-12 pt-8 text-center">
        <p className="text-xs text-text-dim">
          {new Date().getFullYear()} Qarush AI. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
