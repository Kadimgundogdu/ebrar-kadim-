import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Confetti from "react-confetti";

export default function AskOutSite() {
  const [step, setStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && step < 3) {
        setStep(step + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step]);

  const nextStep = () => setStep(step + 1);

  const handleYes = () => {
    setShowConfetti(true);
    setAnswered(true);
    setTimeout(() => alert("EVETTT ❤️ Seni çok seviyorum!"), 500);
  };

  const handleNo = () => {
    alert("Hayır mı? 😭 Lütfen tekrar dene!");
    setStep(0);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-purple-300 overflow-hidden">
      {showConfetti && (
        <Confetti width={windowSize.width} height={windowSize.height} />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 rounded-2xl shadow-2xl text-center max-w-md bg-white">
            <CardContent>
              {step === 0 && (
                <div className="space-y-6">
                  <motion.h1
                    className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Bir şey göstereceğim 👀
                  </motion.h1>
                  <p className="text-gray-600 text-sm">
                    (Enter tuşuna veya butona bas)
                  </p>
                  <Button
                    onClick={nextStep}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg"
                  >
                    Tıkla
                  </Button>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <motion.h1
                    className="text-3xl font-bold text-purple-600"
                    animate={{ rotate: [-2, 2, -2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Ama söz ver korkmayacaksın 😄
                  </motion.h1>
                  <Button
                    onClick={nextStep}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg"
                  >
                    Söz veriyorum
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <motion.h1
                    className="text-3xl font-bold text-pink-600"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Hazır mısın?
                  </motion.h1>
                  <Button
                    onClick={nextStep}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg"
                  >
                    Hazırım
                  </Button>
                </div>
              )}

              {step === 3 && !answered && (
                <div className="space-y-8">
                  <motion.h1
                    className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-purple-600"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [-1, 1, -1],
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    Benimle çıkar mısın? ❤️
                  </motion.h1>

                  <motion.div
                    className="flex gap-4 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={handleYes}
                        className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg"
                      >
                        Evet ❤️
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: Math.random() * 100 - 50, y: Math.random() * 100 - 50 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Button
                        onClick={handleNo}
                        className="bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white font-bold py-3 px-8 rounded-lg text-lg cursor-not-allowed"
                      >
                        Hayır
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              )}

              {answered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">
                    🎉 Seninle çok mutluyum! 💕
                  </h1>
                  <p className="text-2xl text-pink-600">Kadim & Ebrar Forever ❤️</p>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="text-6xl inline-block"
                  >
                    💕
                  </motion.div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}