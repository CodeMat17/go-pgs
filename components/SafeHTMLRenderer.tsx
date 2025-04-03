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

    // Add color inheritance to all elements
    const styledHTML = `
      <div class="force-color-inheritance">
        ${cleanHTML || "<p>&nbsp;</p>"}
      </div>
      <style>
        .force-color-inheritance * {
          color: inherit !important;
          font-family: inherit !important;
        }
      </style>
    `;

    // Add basic paragraph spacing if empty content
    setSanitizedContent(
    styledHTML)
  }, [htmlContent]);

  return (
    <div
      className={`prose prose-p:my-3 prose-p:leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};
