# Local-First Markdown Viewer – Test File

This file is used to **test rendering, styling, and features** of the local-first Markdown viewer.

---

## 1. Text Formatting

**Bold text**  
*Italic text*  
***Bold + Italic***  
~~Strikethrough~~

Inline code: `const viewer = "markdown";`

> Blockquote:  
> Markdown should render cleanly and consistently.

---

## 2. Lists

### Unordered List
- Markdown
- Preview
- Export
  - HTML
  - PDF

### Ordered List
1. Open file
2. Edit markdown
3. Preview output
4. Export result

---

## 3. Task List (GFM)

- [x] Initialize project
- [x] Render markdown
- [ ] Export to HTML
- [ ] Export to PDF
- [ ] Enable PWA support

---

## 4. Code Blocks

### JavaScript
```js
function greet(name) {
  console.log(`Hello, ${name}!`);
}
greet("Developer");
```

### TypeScript
```typescript
type ViewerConfig = {
  darkMode: boolean;
  splitView: boolean;
};

const config: ViewerConfig = {
  darkMode: true,
  splitView: true,
};
```

---

## 5. Tables

| Feature | Supported | Notes |
| :--- | :---: | :--- |
| GFM Tables | ✅ | Must render correctly |
| Task Lists | ✅ | Checkbox support |
| Code Highlighting | ✅ | rehype-highlight |
| Offline Support | ⏳ | PWA in progress |

---

## 6. Links & Images
Website: [Next.js](https://nextjs.org)

Docs: [Markdown Guide](https://www.markdownguide.org)

Image (if supported):
![Placeholder](https://placehold.co/600x200?text=Markdown+Viewer+Test)

---

## 7. Horizontal Rule

---

## 8. Long Content (Scroll Test)
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Vestibulum euismod, nisi vel consectetur interdum, nisl nisi aliquam nunc,
sed tincidunt sapien nulla eu libero.

Repeat this paragraph multiple times to test scrolling, sync, and performance.

---

## 9. Edge Cases
Escaped characters: \* \_ \# \`

Mixed **bold *italic* `code`** text

Empty lines below:


---

## 10. Footer
End of test file.

If this renders correctly, your Markdown viewer is production-ready 🚀
