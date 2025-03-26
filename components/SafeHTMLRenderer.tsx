// components/SafeHTMLRenderer.tsx
"use client";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

interface SafeHTMLRendererProps {
  htmlContent: string;
  className?: string;
}

export const SafeHTMLRenderer = ({
  htmlContent,
  className,
}: SafeHTMLRendererProps) => {
  const [sanitizedContent, setSanitizedContent] = useState("");

  useEffect(() => {
    const cleanHTML = DOMPurify.sanitize(htmlContent, {
      ALLOWED_TAGS: [
        "p",
        "strong",
        "em",
        "u",
        "h1",
        "h2",
        "h3",
        "ul",
        "ol",
        "li",
        "a",
        "br",
      ],
      ALLOWED_ATTR: ["href", "target", "rel"],
      FORBID_ATTR: ["style", "onclick"],
      FORBID_TAGS: ["script", "iframe", "form"],
      ADD_TAGS: ["br"], // Explicitly allow line breaks
      ADD_ATTR: ["rel"],
    });

    // Add basic paragraph spacing if empty content
    setSanitizedContent(cleanHTML || "<p>&nbsp;</p>");
  }, [htmlContent]);

  return (
    <div
      className={`prose prose-p:my-4 prose-p:leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};
