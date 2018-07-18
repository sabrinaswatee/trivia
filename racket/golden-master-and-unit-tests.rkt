#lang racket

(require rackunit
         rackunit/text-ui
         "trivia-with-output-capture.rkt")

(define (repeatable-game . players)
  (random-seed 1234)
  (apply play-game players))

(define golden-master (file->lines "golden-master.txt"))
(define transcript (repeatable-game "Chet" "Pat" "Sue"))

(define diff
  (for/list ([i (in-naturals)]
             [g golden-master]
             [t transcript] #:when (not (equal? t g)))
    (list (~a "Actual   " i ": " t)
          (~a "Expected " i ": " g))))

(define (game->string game-output)
  (apply ~a (add-between game-output "\n")))

(define (re-baseline)
  (display-to-file (game->string transcript) "golden-master.txt"
                   #:exists 'replace))


(define trivia-tests
  (test-suite
   "Tests for trivia.rkt"

   (test-case
    "Number of lines in game output vs lines in golden master"
    (check-equal? (length transcript)
                  (length golden-master)))

   (test-case
    "Line by line comparison of game output vs golden master"
    (check-equal? diff empty))

   (test-case
    "New position"
    (check-equal? (new-position 0 5) 5))
    (check-equal? (new-position  10 5) 3))
  
   )

(run-tests trivia-tests)

