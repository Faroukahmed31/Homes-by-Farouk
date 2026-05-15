import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AboutPage from "@/app/about/page";

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    blockquote: ({ children, ...props }: any) => <blockquote {...props}>{children}</blockquote>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe("AboutPage", () => {
  it("renders the hero section with correct title", () => {
    render(<AboutPage />);
    expect(screen.getByText(/Modern Expertise/i)).toBeInTheDocument();
    expect(screen.getByText(/Future-Proof/i)).toBeInTheDocument();
    expect(screen.getByText(/NAIROBI, KENYA/i)).toBeInTheDocument();
  });

  it("renders the narrative section with the mission quote", () => {
    render(<AboutPage />);
    expect(screen.getByText(/secure your/i)).toBeInTheDocument();
    expect(screen.getByText(/financial future/i)).toBeInTheDocument();
  });

  it("renders the pillars section", () => {
    render(<AboutPage />);
    expect(screen.getByText(/OUR PILLARS/i)).toBeInTheDocument();
    expect(screen.getByText(/ROI Focus/i)).toBeInTheDocument();
    expect(screen.getByText(/Market Authority/i)).toBeInTheDocument();
    expect(screen.getByText(/Vetted Excellence/i)).toBeInTheDocument();
  });

  it("renders the CTA section", () => {
    render(<AboutPage />);
    expect(screen.getByText(/Ready to elevate your investment strategy/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Let’s Discuss Your Portfolio/i })).toBeInTheDocument();
  });
});
