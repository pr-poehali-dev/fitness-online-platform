import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const HERO_IMG = 'https://cdn.poehali.dev/projects/a8ae6773-81f2-4c84-b16d-21ba235a7950/files/776fc0ab-d762-4719-ae50-67bcef584d0d.jpg';
const WORKOUT_IMG = 'https://cdn.poehali.dev/projects/a8ae6773-81f2-4c84-b16d-21ba235a7950/files/4604e9cb-3e8c-45b3-ba17-42618dc30320.jpg';

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
                <Button size="sm" className="font-display uppercase">Купить</Button>
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
                <Button className="w-full font-display uppercase tracking-wide" size="lg">Записаться</Button>
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
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mt-2 mb-6">Привет, я твой тренер</h2>
            <p className="text-muted-foreground mb-4">
              Мне 40 лет, и спортом я занимаюсь с 3 лет. За эти годы я прошла путь от профессионального спорта до сертифицированного фитнес-наставника.
            </p>
            <p className="text-muted-foreground mb-8">
              Я знаю, как изменить тело в любом возрасте — без изнуряющих диет и травм. Мои онлайн-тренировки и марафоны помогли тысячам женщин обрести форму мечты.
            </p>
            <div className="grid grid-cols-2 gap-5">
              {[['Award', 'Сертифицированный тренер'], ['Users', '2 500+ учениц'], ['HeartPulse', 'Программы под любой возраст'], ['Video', 'Доступ навсегда']].map(([icon, text]) => (
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
              {[['Mail', 'hello@forma.fit'], ['Phone', '+7 (900) 000-00-00'], ['Send', '@forma_trener']].map(([icon, val]) => (
                <div key={val} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><Icon name={icon} size={20} /></div>
                  <span>{val}</span>
                </div>
              ))}
            </div>
          </div>
          <Card className="p-7 bg-card border-border">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Ваше имя" className="bg-background border-border" />
              <Input type="email" placeholder="Email" className="bg-background border-border" />
              <Textarea placeholder="Сообщение" rows={4} className="bg-background border-border" />
              <Button type="submit" size="lg" className="w-full font-display uppercase tracking-wide">Отправить</Button>
            </form>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-xl">FOR<span className="text-primary">MA</span></div>
          <p className="text-sm text-muted-foreground">© 2026 FORMA. Все права защищены.</p>
          <div className="flex gap-4 text-muted-foreground">
            <a href="#" className="hover:text-primary"><Icon name="Instagram" size={20} /></a>
            <a href="#" className="hover:text-primary"><Icon name="Send" size={20} /></a>
            <a href="#" className="hover:text-primary"><Icon name="Youtube" size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;
