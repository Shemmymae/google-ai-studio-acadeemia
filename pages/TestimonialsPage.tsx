import React from 'react';
import LandingLayout from '../components/LandingLayout';

const PageHero = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="bg-secondary dark:bg-gray-800 py-16">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-text-primary dark:text-gray-100">{title}</h1>
            <p className="mt-2 text-lg text-text-secondary dark:text-gray-300">{subtitle}</p>
        </div>
    </div>
);

const TestimonialCard = ({ quote, name, title, imgSrc }: { quote: string, name: string, title: string, imgSrc: string }) => (
    <div className="bg-card dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700 h-full flex flex-col">
      <p className="text-text-secondary dark:text-gray-300 mb-6 flex-grow">"{quote}"</p>
      <div className="flex items-center">
        <img src={imgSrc} alt={name} className="w-12 h-12 rounded-full mr-4"/>
        <div>
          <p className="font-bold text-text-primary dark:text-gray-100">{name}</p>
          <p className="text-sm text-text-secondary dark:text-gray-400">{title}</p>
        </div>
      </div>
    </div>
);


const TestimonialsPage = () => {
    const testimonials = [
        {
          quote: "Acadeemia has transformed how we operate. The platform is intuitive, powerful, and has saved us countless hours of administrative work.",
          name: "Jane Doe",
          title: "Principal, Bright Future Academy",
          imgSrc: "https://picsum.photos/id/1005/50/50"
        },
        {
          quote: "The parent portal is a game-changer. Communication is now seamless, and parents feel more connected to their child's education.",
          name: "John Smith",
          title: "Parent",
          imgSrc: "https://picsum.photos/id/1011/50/50"
        },
        {
          quote: "As a teacher, the gradebook and attendance features are incredibly easy to use. I can focus more on teaching and less on paperwork.",
          name: "Emily White",
          title: "Teacher, Northwood High",
          imgSrc: "https://picsum.photos/id/1027/50/50"
        },
        {
          quote: "The implementation and support team were fantastic. They guided us through the entire process and made the transition smooth for our staff.",
          name: "Michael Brown",
          title: "IT Director, Lakeside Prep",
          imgSrc: "https://picsum.photos/id/10/50/50"
        },
        {
          quote: "Finally, a system that understands the complexities of a modern school. The reporting features alone are worth their weight in gold.",
          name: "Sarah Chen",
          title: "Administrator, Oakdale Elementary",
          imgSrc: "https://picsum.photos/id/22/50/50"
        },
        {
          quote: "Our re-enrollment process is now 90% faster thanks to the streamlined admissions and billing modules in Acadeemia.",
          name: "David Lee",
          title: "Admissions Head, Crestview International",
          imgSrc: "https://picsum.photos/id/33/50/50"
        }
    ];

    return (
        <LandingLayout>
            <PageHero title="Trusted by Educators Worldwide" subtitle="See what school leaders, teachers, and parents have to say about Acadeemia." />
            <section className="py-20 bg-background dark:bg-gray-900">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard key={index} {...testimonial} />
                        ))}
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
};

export default TestimonialsPage;