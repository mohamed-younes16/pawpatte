import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Target, Heart, X, AlertCircleIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
export default function AboutUs() {
  return (
    <Dialog>
      <DialogTrigger
        className="text-lg font-semibold hover:text-second
                   text-primary block whitespace-nowrap "
      >
        <Button className=" text-white gap-2 px-4 py-2 rounded-md">
          <AlertCircleIcon className="h-6 w-6 " />
          about us
        </Button>
      </DialogTrigger>
      <DialogContent
        className="bg-neutral-200 max-w-4xl 
      lg:!w-[80vw] lg:max-w-[900px] h-[80vh] overflow-scroll
      "
      >
        <DialogHeader>
          <DialogDescription>
            <div className="min-h-screen mt-8 bg-background">
              <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black text-primary-foreground">
                <div className="max-w-4xl mx-auto text-center">
                  <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
                    About Pawpatte
                  </h1>
                  <p className="mt-6 text-xl">
                    Dedicated to giving pets the joy and care they deserve.
                  </p>
                </div>
              </div>

              <div className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bold text-center mb-8">
                    Our Mission
                  </h2>
                  <p className="text-lg text-center mb-8">
                    At Pawpatte, our mission is to enhance the lives of pets and
                    their owners through quality products and a commitment to
                    happiness, health, and comfort.
                  </p>
                  <div className="grid gap-8 md:grid-cols-3">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Users className="mr-2" /> Caring
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>
                          We believe every pet deserves care and affection, just
                          like family.
                        </CardDescription>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Target className="mr-2" /> Quality
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>
                          Our products are crafted with care, providing pets
                          with joy and durability.
                        </CardDescription>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Heart className="mr-2" /> Comfort
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>
                          Designed with pets in mind, ensuring comfort in every
                          product.
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <div className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bold text-center mb-8">
                    Our Team
                  </h2>
                  <div className="grid gap-8 md:grid-cols-3">
                    {["john", "chris", "mark"].map((name, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle>{name}</CardTitle>
                          <CardDescription>Pet Lover & Expert</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <img
                            src={`/assets/placeholder.jpg`}
                            alt={name}
                            className="w-full h-48 object-cover rounded-md mb-4"
                          />
                          <p className="text-sm">
                            Dedicated to creating the best for pets and their
                            owners.
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA div */}
              <div className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl font-bold mb-4">
                    Join Us in Bringing Joy to Pets Everywhere
                  </h2>
                  <p className="text-lg mb-8">
                    We're always looking for passionate individuals to help us
                    make pets' lives happier and healthier.
                  </p>
                  <Button size="lg">View Open Positions</Button>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogClose className="p-0 absolute cursor-pointer w-10 rounded-full m-0 h-10 top-2 right-2 ">
          <X
            strokeWidth={3}
            className="rounded-full cursor-pointer bg-white w-7 h-7 "
          />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
