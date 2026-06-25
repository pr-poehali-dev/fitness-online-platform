import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const ORDER_URL = 'https://functions.poehali.dev/28717117-c24e-43d4-98a3-1f5fd63dfa44';

const HERO_IMG = 'https://cdn.poehali.dev/projects/a8ae6773-81f2-4c84-b16d-21ba235a7950/bucket/4489ea37-9c13-459d-aad2-3a4e658bc7c8.jpeg';
const WORKOUT_IMG = 'https://cdn.poehali.dev/projects/a8ae6773-81f2-4c84-b16d-21ba235a7950/bucket/9716786a-accd-4571-b8fd-7ed202ff3c11.jpeg';

const nav = [
  { label: 'Главная', href: '#hero' },
  { label: 'Тренировки', href: '#workouts' },
  { label: 'Марафоны', href: '#marathons' },
  { label: 'О тренере', href: '#about' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contacts' },
];

const workouts = [
  { title: 'Жиросжигание HIIT', desc: '12 интенсивных тренировок для быстрого результата', duration: '30 мин', level: 'Средний', price: '1 490 ₽', icon: 'Flame' },
  { title: 'Стройные ноги и ягодицы', desc: 'Комплекс для проработки нижней части тела', duration: '40 мин', level: 'Любой', price: '1 290 ₽', icon: 'Activity' },
  { title: 'Утренняя зарядка', desc: 'Энергия и бодрость на весь день', duration: '15 мин', level: 'Лёгкий', price: '890 ₽', icon: 'Sunrise' },
  { title: 'Плоский живот', desc: 'Прокачка пресса и кора без оборудования', duration: '25 мин', level: 'Средний', price: '1 190 ₽', icon: 'Zap' },
  { title: 'Растяжка и гибкость', desc: 'Восстановление и расслабление мышц', duration: '35 мин', level: 'Любой', price: '990 ₽', icon: 'Feather' },
  { title: 'Силовой комплекс', desc: 'Тренировки с гантелями на всё тело', duration: '45 мин', level: 'Высокий', price: '1 690 ₽', icon: 'Dumbbell' },
];

const marathons = [
  { title: 'Марафон «-5 кг за 21 день»', desc: 'Интенсивная программа похудения с поддержкой тренера и планом питания', tag: 'Хит', price: '4 900 ₽', features: ['21 день тренировок', 'План питания', 'Чат поддержки', 'Контроль прогресса'] },
  { title: 'Марафон «Идеальная форма»', desc: '6 недель комплексной трансформации тела для стойкого результата', tag: 'Новинка', price: '7 900 ₽', features: ['42 дня программы', 'Индивидуальный план', 'Еженедельные вебинары', 'Замеры и отчёты'] },
  { title: 'Марафон «Старт» для новичков', desc: 'Мягкий вход в регулярные тренировки с нуля', tag: 'Для начинающих', price: '2 900 ₽', features: ['14 дней', 'Базовые упражнения', 'Гайд по питанию', 'Чат участников'] },
];

const reviews = [
  { name: 'Анна, 34', text: 'За марафон ушло 6 кг! Очень доступные объяснения, занималась прямо дома. Спасибо за мотивацию!', rating: 5 },
  { name: 'Мария, 41', text: 'Наконец-то нашла тренера, который понимает тело после 40. Тренировки бомба, чувствую себя на 10 лет моложе.', rating: 5 },
  { name: 'Ольга, 28', text: 'Купила несколько тренировок в записи — удобно заниматься в своём ритме. Результат виден уже через 3 недели.', rating: 5 },
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { toast } = useToast();
  const [order, setOrder] = useState<{ product: string; price: string } | null>(null);
  const [form, setForm] = useState({ name: '', contact: '', comment: '' });
  const [sending, setSending] = useState(false);

  const openOrder = (product: string, price: string) => {
    setForm({ name: '', contact: '', comment: '' });
    setOrder({ product, price });
  };

  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim()) {
      toast({ title: 'Заполните имя и контакт', variant: 'destructive' });
      return;
    }
    setSending(true);
    try {
      const res = await fetch(ORDER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, product: order?.product, price: order?.price }),
      });
      if (!res.ok) throw new Error();
      toast({ title: 'Заявка отправлена!', description: 'Я свяжусь с вами в ближайшее время.' });
      setOrder(null);
    } catch {
      toast({ title: 'Не удалось отправить', description: 'Попробуйте ещё раз позже.', variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <a href="#hero" className="font-display text-2xl font-bold tracking-tight">
            FOR<span className="text-primary">MA</span>
          </a>
          <nav className="hidden md:flex items-center gap-7">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{n.label}</a>
            ))}
          </nav>
          <Button asChild className="hidden md:inline-flex font-display uppercase tracking-wide">
            <a href="#workouts">Начать</a>
          </Button>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={26} />
          </button>
        </div>
        {menuOpen && (
          <nav className="md:hidden flex flex-col gap-1 px-4 pb-4 border-t border-border bg-background">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="py-2 text-muted-foreground hover:text-primary">{n.label}</a>
            ))}
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative pt-16 min-h-screen flex items-center overflow-hidden grain">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMG} alt="Тренер" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-2xl animate-float-up">
            <span className="inline-flex items-center gap-2 text-primary text-sm font-medium uppercase tracking-widest mb-5">
              <Icon name="Sparkles" size={16} /> 30+ лет в спорте
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] uppercase mb-6">
              Твоё тело <br /><span className="text-primary">в идеальной</span><br /> форме
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Онлайн-тренировки в записи и марафоны по похудению. Занимайся дома в своём ритме и получай реальный результат.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="font-display uppercase tracking-wide text-base">
                <a href="#marathons">Выбрать марафон</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-display uppercase tracking-wide text-base border-foreground/20">
                <a href="#workouts">Каталог тренировок</a>
              </Button>
            </div>
            <div className="flex gap-10 mt-14">
              {[['2 500+', 'учениц'], ['98%', 'довольны'], ['50+', 'программ']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-3xl text-primary font-bold">{n}</div>
                  <div className="text-sm text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WORKOUTS */}
      <section id="workouts" className="py-24 container mx-auto px-4">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <span className="text-primary text-sm uppercase tracking-widest">Видео в записи</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mt-2">Тренировки</h2>
          </div>
          <p className="text-muted-foreground max-w-sm">Покупай отдельные программы и занимайся когда удобно — доступ навсегда.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((w) => (
            <Card key={w.title} className="group p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 hover-scale">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-primary">
                <Icon name={w.icon} size={24} />
              </div>
              <h3 className="font-display text-xl uppercase mb-2">{w.title}</h3>
              <p className="text-sm text-muted-foreground mb-5">{w.desc}</p>
              <div className="flex gap-4 text-xs text-muted-foreground mb-5">
                <span className="flex items-center gap-1"><Icon name="Clock" size={14} /> {w.duration}</span>
                <span className="flex items-center gap-1"><Icon name="TrendingUp" size={14} /> {w.level}</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="font-display text-2xl text-primary font-bold">{w.price}</span>
                <Button size="sm" className="font-display uppercase" onClick={() => openOrder(w.title, w.price)}>Купить</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* MARATHONS */}
      <section id="marathons" className="py-24 bg-card/40 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-primary text-sm uppercase tracking-widest">С поддержкой тренера</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mt-2">Марафоны похудения</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {marathons.map((m, i) => (
              <Card key={m.title} className={`relative p-7 bg-background border-border flex flex-col ${i === 0 ? 'lg:scale-105 border-primary/60' : ''}`}>
                <span className="absolute -top-3 left-7 bg-primary text-primary-foreground text-xs font-bold uppercase px-3 py-1 rounded-full font-display tracking-wide">{m.tag}</span>
                <h3 className="font-display text-2xl uppercase mt-3 mb-3">{m.title}</h3>
                <p className="text-sm text-muted-foreground mb-6">{m.desc}</p>
                <ul className="space-y-3 mb-7 flex-1">
                  {m.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <Icon name="Check" size={18} className="text-primary shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="font-display text-3xl text-primary font-bold mb-4">{m.price}</div>
                <Button className="w-full font-display uppercase tracking-wide" size="lg" onClick={() => openOrder(m.title, m.price)}>Записаться</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img src={WORKOUT_IMG} alt="О тренере" className="rounded-2xl w-full object-cover aspect-[4/5]" />
            <div className="absolute -bottom-6 -right-2 md:-right-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-xl">
              <div className="font-display text-4xl font-bold">37</div>
              <div className="text-sm font-medium">лет в спорте</div>
            </div>
          </div>
          <div>
            <span className="text-primary text-sm uppercase tracking-widest">О тренере</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mt-2 mb-6">Привет, я <span className="text-primary">Яна</span></h2>
            <p className="text-muted-foreground mb-4">
              Мне 40 лет, спортом занимаюсь с 3 лет, а фитнес-тренером работаю уже более 10 лет. Я дипломированный специалист по прикладной нутрициологии — знаю, как работает тело изнутри.
            </p>
            <p className="text-muted-foreground mb-4">
              Я обожаю свою работу и терпеть не могу рутину и скучные тренировки. Поэтому все мои занятия проходят в лёгкой танцевальной форме — без изнурительных диет и мучений.
            </p>
            <p className="text-muted-foreground mb-8">
              После моих тренировок ты получаешь не только колоссальный заряд энергии, но и потрясающее настроение на весь день! 🔥
            </p>
            <div className="grid grid-cols-2 gap-5">
              {[['Award', '10+ лет тренерского опыта'], ['Salad', 'Нутрициолог по диплому'], ['HeartPulse', 'Танцевальный формат'], ['Smile', 'Заряд и настроение']].map(([icon, text]) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon name={icon} size={22} className="text-primary shrink-0" />
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-card/40 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-primary text-sm uppercase tracking-widest">Реальные результаты</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mt-2">Отзывы клиентов</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <Card key={r.name} className="p-7 bg-background border-border">
                <div className="flex gap-1 mb-4 text-primary">
                  {Array.from({ length: r.rating }).map((_, i) => <Icon key={i} name="Star" size={18} className="fill-primary" />)}
                </div>
                <p className="text-muted-foreground mb-6 italic">«{r.text}»</p>
                <div className="font-display uppercase text-sm tracking-wide">{r.name}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <span className="text-primary text-sm uppercase tracking-widest">Свяжись со мной</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mt-2 mb-6">Остались вопросы?</h2>
            <p className="text-muted-foreground mb-8">Напиши мне, и я помогу выбрать подходящую программу под твои цели.</p>
            <div className="space-y-4">
              {[
                ['Mail', 'yana-andrisovna@yandex.ru', 'mailto:yana-andrisovna@yandex.ru'],
                ['Phone', '+7 (996) 348-30-27', 'tel:+79963483027'],
                ['Send', '@YanaOtikova (Telegram)', 'https://t.me/YanaOtikova'],
                ['Instagram', '@Yana_workfit (Instagram)', 'https://instagram.com/Yana_workfit'],
              ].map(([icon, val, href]) => (
                <a key={val} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><Icon name={icon} size={20} /></div>
                  <span>{val}</span>
                </a>
              ))}
            </div>
          </div>
          <Card className="p-7 bg-card border-border">
            <ContactForm onSent={() => toast({ title: 'Сообщение отправлено!', description: 'Я свяжусь с вами в ближайшее время.' })} onError={() => toast({ title: 'Не удалось отправить', variant: 'destructive' })} />
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-xl">FOR<span className="text-primary">MA</span></div>
          <p className="text-sm text-muted-foreground">© 2026 FORMA. Все права защищены.</p>
          <div className="flex gap-4 text-muted-foreground">
            <a href="https://instagram.com/Yana_workfit" target="_blank" rel="noopener noreferrer" className="hover:text-primary"><Icon name="Instagram" size={20} /></a>
            <a href="https://t.me/YanaOtikova" target="_blank" rel="noopener noreferrer" className="hover:text-primary"><Icon name="Send" size={20} /></a>
          </div>
        </div>
      </footer>

      {/* ORDER DIALOG */}
      <Dialog open={!!order} onOpenChange={(v) => !v && setOrder(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display uppercase text-2xl">Оформление заказа</DialogTitle>
            <DialogDescription>
              {order && <span className="text-foreground">{order.product} — <span className="text-primary font-semibold">{order.price}</span></span>}
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4 mt-2" onSubmit={submitOrder}>
            <Input placeholder="Ваше имя" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-background border-border" />
            <Input placeholder="Телефон, email или Telegram" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="bg-background border-border" />
            <Textarea placeholder="Комментарий (необязательно)" rows={3} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} className="bg-background border-border" />
            <Button type="submit" size="lg" disabled={sending} className="w-full font-display uppercase tracking-wide">
              {sending ? 'Отправка...' : 'Отправить заявку'}
            </Button>
            <p className="text-xs text-muted-foreground text-center">После заявки я свяжусь с вами для оплаты и доступа.</p>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ContactForm({ onSent, onError }: { onSent: () => void; onError: () => void }) {
  const [form, setForm] = useState({ name: '', contact: '', comment: '' });
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim()) {
      onError();
      return;
    }
    setSending(true);
    try {
      const res = await fetch(ORDER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, product: 'Вопрос с сайта', price: '' }),
      });
      if (!res.ok) throw new Error();
      setForm({ name: '', contact: '', comment: '' });
      onSent();
    } catch {
      onError();
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={submit}>
      <Input placeholder="Ваше имя" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-background border-border" />
      <Input placeholder="Email или Telegram" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="bg-background border-border" />
      <Textarea placeholder="Сообщение" rows={4} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} className="bg-background border-border" />
      <Button type="submit" size="lg" disabled={sending} className="w-full font-display uppercase tracking-wide">
        {sending ? 'Отправка...' : 'Отправить'}
      </Button>
    </form>
  );
}

export default Index;