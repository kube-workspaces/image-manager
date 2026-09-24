"use client";

import { useState } from "react";

interface ImageFormData {
  // Required fields (from CRD spec)
  name: string;
  displayName: string;
  description: string;
  
  // Optional but commonly used fields
  category?: string;
  tags?: string[];
  defaultPath?: string;
  defaultPort?: number;
  image?: string;
  imageHomepageURL?: string;
  homepageURL?: string;
  icon?: string;
  proxyConfig?: any;
  sourceURL?: string;
  annotations?: Record<string, string>;
}

const DEFAULT_VALUES: ImageFormData = {
  name: "",
  displayName: "",
  description: "",
  category: "Tool",
  tags: [],
  defaultPath: "/",
  defaultPort: 8080,
  image: "",
  imageHomepageURL: "",
  homepageURL: "",
  icon: "",
  proxyConfig: null,
  sourceURL: "",
  annotations: {},
};

export default function ImageForm() {
  const [formData, setFormData] = useState<ImageFormData>(DEFAULT_VALUES);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Field validation rules
  const validateField = (name: string, value: any, required?: boolean) => {
    if (required && !value?.trim()) {
      return `${name} is required`;
    }
    if (name === "defaultPort" && value !== undefined && value < 1 || value > 65535) {
      return "Port must be between 1 and 65535";
    }
    return "";
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Required field validations
    if (!formData.name?.trim()) newErrors.name = "Name is required";
    if (!formData.displayName?.trim()) newErrors.displayName = "Display name is required";
    if (!formData.description?.trim()) newErrors.description = "Description is required";
    if (!formData.image?.trim()) newErrors.image = "Image is required";
    
    // Port validation if provided
    const portError = validateField("defaultPort", formData.defaultPort, false);
    if (portError) newErrors.defaultPort = portError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle array fields (tags)
    if (name === "tags") {
      setFormData(prev => ({
        ...prev,
        tags: value.split(",").map((tag: string) => tag.trim()).filter(Boolean)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implement API call to create Image CR
      // For now, we'll just show a success message
      
      console.log("Form submitted with data:", formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert("Image resource created successfully! Check the preview below.");
    } catch (error) {
      console.error("Error creating Image:", error);
      alert("An error occurred while creating the Image. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(DEFAULT_VALUES);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Form Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text">Create Image Resource</h2>
        <button
          type="button"
          onClick={handleReset}
          className="btn-primary px-4 py-2 bg-border hover:bg-border-subtle transition-colors"
        >
          Reset Form
        </button>
      </div>

      {/* Required Fields Section */}
      <section>
        <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wide mb-3">Required Fields</h3>
        
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., adminer"
            className={`form-input ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>

        {/* Display Name Field */}
        <div className="form-group">
          <label htmlFor="displayName" className="form-label">
            Display Name <span className="text-red-500">*</span>
          </label>
          <input
            id="displayName"
            name="displayName"
            type="text"
            value={formData.displayName}
            onChange={handleChange}
            placeholder="e.g., Adminer (Database Manager)"
            className={`form-input ${errors.displayName ? "border-red-500" : ""}`}
          />
          {errors.displayName && <p className="form-error">{errors.displayName}</p>}
        </div>

        {/* Description Field */}
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="A brief description of what this image does..."
            rows={3}
            className={`form-input form-textarea ${errors.description ? "border-red-500" : ""}`}
          />
          {errors.description && <p className="form-error">{errors.description}</p>}
        </div>

        {/* Image Field */}
        <div className="form-group">
          <label htmlFor="image" className="form-label">
            Docker Image <span className="text-red-500">*</span>
          </label>
          <input
            id="image"
            name="image"
            type="text"
            value={formData.image}
            onChange={handleChange}
            placeholder="e.g., linuxserver/adminer:latest"
            className={`form-input ${errors.image ? "border-red-500" : ""}`}
          />
          {errors.image && <p className="form-error">{errors.image}</p>}
        </div>

        {/* Image Homepage URL Field */}
        <div className="form-group">
          <label htmlFor="imageHomepageURL" className="form-label">
            Image Homepage URL
          </label>
          <input
            id="imageHomepageURL"
            name="imageHomepageURL"
            type="url"
            value={formData.imageHomepageURL}
            onChange={handleChange}
            placeholder="e.g., https://hub.docker.com/_/adminer"
            className="form-input"
          />
        </div>

        {/* Source URL Field */}
        <div className="form-group">
          <label htmlFor="sourceURL" className="form-label">
            Source URL (GitHub, etc.)
          </label>
          <input
            id="sourceURL"
            name="sourceURL"
            type="url"
            value={formData.sourceURL}
            onChange={handleChange}
            placeholder="e.g., https://github.com/vrana/adminer"
            className="form-input"
          />
        </div>

        {/* Homepage URL Field */}
        <div className="form-group">
          <label htmlFor="homepageURL" className="form-label">
            Homepage URL
          </label>
          <input
            id="homepageURL"
            name="homepageURL"
            type="url"
            value={formData.homepageURL}
            onChange={handleChange}
            placeholder="e.g., https://www.adminer.org"
            className="form-input"
          />
        </div>

        {/* Icon URL Field */}
        <div className="form-group">
          <label htmlFor="icon" className="form-label">
            Icon URL (SVG/PNG)
          </label>
          <input
            id="icon"
            name="icon"
            type="url"
            value={formData.icon}
            onChange={handleChange}
            placeholder="e.g., https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/adminer.svg"
            className="form-input"
          />
        </div>

        {/* Annotations Field */}
        <div className="form-group">
          <label htmlFor="annotations" className="form-label">
            Annotations (JSON)
          </label>
          <textarea
            id="annotations"
            name="annotations"
            value={JSON.stringify(formData.annotations, null, 2)}
            onChange={(e) => setFormData(prev => ({ ...prev, annotations: JSON.parse(e.target.value || "{}") }))}
            placeholder='{"key": "value"}'
            rows={3}
            className="form-input form-textarea font-mono text-sm"
          />
        </div>
      </section>

      {/* Optional Fields Section */}
      <section>
        <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wide mb-3">Optional Fields</h3>

        {/* Category Field */}
        <div className="form-group">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select a category...</option>
            <option value="Tool">Tool</option>
            <option value="Browser">Browser</option>
            <option value="IDE">IDE</option>
            <option value="Desktop">Desktop</option>
            <option value="VM">VM</option>
            <option value="Database">Database</option>
            <option value="Developer">Developer</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Tags Field */}
        <div className="form-group">
          <label htmlFor="tags" className="form-label">Tags (comma-separated)</label>
          <input
            id="tags"
            name="tags"
            type="text"
            value={formData.tags?.join(", ")}
            onChange={handleChange}
            placeholder="e.g., database, management, php"
            className="form-input"
          />
        </div>

        {/* Default Path Field */}
        <div className="form-group">
          <label htmlFor="defaultPath" className="form-label">Default Path</label>
          <input
            id="defaultPath"
            name="defaultPath"
            type="text"
            value={formData.defaultPath}
            onChange={handleChange}
            placeholder="/"
            className="form-input"
          />
        </div>

        {/* Default Port Field */}
        <div className="form-group">
          <label htmlFor="defaultPort" className="form-label">Default Port</label>
          <input
            id="defaultPort"
            name="defaultPort"
            type="number"
            value={formData.defaultPort ?? 8080}
            onChange={(e) => setFormData(prev => ({ ...prev, defaultPort: parseInt(e.target.value) }))}
            placeholder="8080"
            min={1}
            max={65535}
            className="form-input"
          />
        </div>

        {/* Image Homepage URL Field */}
        <div className="form-group">
          <label htmlFor="imageHomepageURL2" className="form-label">Image Homepage URL</label>
          <input
            id="imageHomepageURL2"
            name="imageHomepageURL"
            type="url"
            value={formData.imageHomepageURL}
            onChange={handleChange}
            placeholder="e.g., https://hub.docker.com/r/linuxserver/adminer"
            className="form-input"
          />
        </div>

        {/* Proxy Config Field */}
        <div className="form-group">
          <label htmlFor="proxyConfig" className="form-label">Proxy Config (JSON)</label>
          <textarea
            id="proxyConfig"
            name="proxyConfig"
            value={formData.proxyConfig ? JSON.stringify(formData.proxyConfig, null, 2) : "{}"}
            onChange={(e) => setFormData(prev => ({ ...prev, proxyConfig: e.target.value ? JSON.parse(e.target.value) : {} }))}
            placeholder='{"key": "value"}'
            rows={3}
            className="form-input form-textarea font-mono text-sm"
          />
        </div>

        {/* Annotations Field (JSON) */}
        <div className="form-group">
          <label htmlFor="annotations2" className="form-label">Additional Annotations (JSON)</label>
          <textarea
            id="annotations2"
            name="annotations"
            value={formData.annotations ? JSON.stringify(formData.annotations, null, 2) : "{}"}
            onChange={(e) => setFormData(prev => ({ ...prev, annotations: e.target.value ? JSON.parse(e.target.value) : {} }))}
            placeholder='{"key": "value"}'
            rows={3}
            className="form-input form-textarea font-mono text-sm"
          />
        </div>

        {/* Preview Section */}
        <section>
          <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wide mb-3">Preview</h3>
          <div className="code-block">
            <pre>{JSON.stringify(formData, null, 2)}</pre>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
              }}
              className="copy-btn"
            >
              Copy YAML
            </button>
          </div>
        </section>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-subtle">
          <button
            type="button"
            onClick={handleReset}
            className="btn-primary px-6 py-2 bg-surface hover:bg-surface-hover text-text transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary px-6 py-2 bg-primary hover:bg-primary-hover text-primary-foreground font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 6.268A8 8 0 0112 20v2c7.37 0 13-5.63 13-12.5S19.37 0 12 0a8 8 0 01-8 8z"/>
                </svg>
                Creating...
              </>
            ) : (
              "Create Image Resource"
            )}
          </button>
        </div>

        {/* Field Hints */}
        <section className="mt-6 pt-4 border-t border-border-subtle">
          <h4 className="text-sm font-medium text-text-secondary mb-2">Field Reference</h4>
          <ul className="space-y-1 text-sm text-text-muted">
            <li><code className="bg-surface-inset px-1 py-0.5 rounded">name</code> - Unique identifier for the Image resource (required)</li>
            <li><code className="bg-surface-inset px-1 py-0.5 rounded">displayName</code> - User-friendly name displayed in UI (required)</li>
            <li><code className="bg-surface-inset px-1 py-0.5 rounded">description</code> - Brief description of the image's purpose (required)</li>
            <li><code className="bg-surface-inset px-1 py-0.5 rounded">image</code> - Docker image reference (required)</li>
            <li><code className="bg-surface-inset px-1 py-0.5 rounded">defaultPath</code> - Default URL path for the container</li>
            <li><code className="bg-surface-inset px-1 py-0.5 rounded">defaultPort</code> - Default port to expose (1-65535)</li>
            <li><code className="bg-surface-inset px-1 py-0.5 rounded">icon</code> - URL to an icon image (SVG/PNG recommended)</li>
            <li><code className="bg-surface-inset px-1 py-0.5 rounded">annotations</code> - Additional key-value pairs for metadata</li>
          </ul>
        </section>
      </section>
    </form>
  );
}
