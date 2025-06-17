# اطلاعات دانشجو

| نام دانشجو    | شماره دانشجویی |
| ------------- | -------------- |
| مانی ابراهیمی | ۴۰۱۱۷۰۴۹۱      |

# توضیحات کلی

در این پروژه تا یک ابزار مشابه با Paint به صورت برنامه تک‌صفحه‌ای (SPA) ساده ارائه می‌شود. در این ابزار شما می‌توانید: 
- اشکال ساده مانند دایره، مثلث و مربع رسم کنید.
- اشکال روی صفحه را جابه‌جا کنید.
- اشکال روی صفحه را حذف کنید.
- به قالب JSON ورودی و خروجی بگیرید.
- نام نقاشی خود را تعیین کنید یا تغییر دهید.
- با استفاده از فضای ذخیره‌ی محلی مرورگر خود نقاشی خود را ذخیره و بارگذاری نمایید.

# کارکرد

معماری این پروژه MVVM بوده که در:
- بخش مدل: تعریف دیتاتایپ‌ها صورت می‌گیرد.
- بخش ویو: یو‌آی تعریف شده.
- بخش ویومادل: ارتباط (binder) بین دو بخش بالاست و منطق اصلی برای داده‌ها اینجا قرار دارد.

نکته‌ی خوب این معماری اینجاست که هر تغییری نیاز باشد بدهیم، نیاز نیست فایل‌ها را از اول بنویسیم و فایل‌های بسیار طولانی‌تری ایجاد کنیم چرا که جدایش مسئولیت‌ها از قبل در نظر گرفته شده است. 
این ابزار برای ذخیره داده‌ها از دانلود و آپلود JSON و همچنین Local Storage استفاده می‌کند که دیتاتایپ تعریف شده را به این فرمت سریالایز می‌کند. سعی شده تا حد امکان از ماژول‌های NPM استفاده نشود و همه‌چیز خود ساخته باشد (طبیعتا آیکن‌ها ماژول خارجی هستند چون طراحی گرافیکی از اهداف این درس (و احتمالا این رشته‌ی تحصیلی) جداست). به منظور دریافت باگ‌های مربوط به تایپ‌ها پیش از اجرای برنامه از تایپ‌اسکریپت استفاده شده تا مشکلاتی از قبیل مشکلات مربوط به داده‌های نامناسب و نابجا رخ ندهند یا در صورت رخ دادن دیباگ آن‌ها راحتتر باشد.

# قطعه‌ کد‌های لازم به توضیح

داخل و خارج بودن یک نقطه (با استفاده از تعریف ریاضی هر شکل) به این صورت انجام می‌شود:

```ts
import { type Shape } from '../models/shapes';

export const pointInShape = (shape: Shape, x: number, y: number): boolean => {
  const dx = x - shape.x;
  const dy = y - shape.y;
  switch (shape.type) {
    case 'circle':
      return Math.hypot(dx, dy) <= shape.size;
    case 'square':
      return Math.abs(dx) <= shape.size / 2 && Math.abs(dy) <= shape.size / 2;
    case 'triangle': {
      const p0 = { x: shape.x, y: shape.y - shape.size / 2 };
      const p1 = { x: shape.x - shape.size / 2, y: shape.y + shape.size / 2 };
      const p2 = { x: shape.x + shape.size / 2, y: shape.y + shape.size / 2 };
      const det = (p1.y - p2.y) * (p0.x - p2.x) + (p2.x - p1.x) * (p0.y - p2.y);
      const s = ((p1.y - p2.y) * (x - p2.x) + (p2.x - p1.x) * (y - p2.y)) / det;
      const t = ((p2.y - p0.y) * (x - p2.x) + (p0.x - p2.x) * (y - p2.y)) / det;
      const u = 1 - s - t;
      return s >= 0 && t >= 0 && u >= 0;
    }
    default:
      return false;
  }
};
```



به این صورت در Local Storage داده‌های اشکال را می‌نویسیم و می‌خوانیم. همچنین عملیات سریالایز کردن به این شکل انجام می‌شود:

```ts
import { type Shape } from '../models/shapes';

const KEY = 'paint-line-project';
interface ProjectJSON {
  name: string;
  shapes: Shape[];
}

export const loadProject = (): ProjectJSON => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { name: 'Untitled', shapes: [] };
    const data = JSON.parse(raw);

    if (Array.isArray(data)) {
      return { name: 'Untitled', shapes: data as Shape[] };
    }
    if (typeof data.name === 'string' && Array.isArray(data.shapes)) {
      return data as ProjectJSON;
    }
  } catch {
  }
  return { name: 'Untitled', shapes: [] };
};

export const saveProject = (proj: ProjectJSON) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(proj));
  } catch {}
};

```

نوشتن روی canvas هم به این شکل انجام می‌شود:

```ts
import { type Shape } from '../models/shapes';

export const drawShapes = (
  ctx: CanvasRenderingContext2D,
  shapes: Shape[],
): void => {
  const { width, height } = ctx.canvas;
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;

  shapes.forEach((s) => {
    ctx.beginPath();
    switch (s.type) {
      case 'circle':
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        break;
      case 'square':
        ctx.rect(s.x - s.size / 2, s.y - s.size / 2, s.size, s.size);
        break;
      case 'triangle':
        ctx.moveTo(s.x, s.y - s.size / 2);
        ctx.lineTo(s.x - s.size / 2, s.y + s.size / 2);
        ctx.lineTo(s.x + s.size / 2, s.y + s.size / 2);
        ctx.closePath();
        break;
    }
    ctx.stroke();
  });
};

```

