#lang racket

(require data/queue)

(provide play-game
         new-position)

(define players null)
(define places null)
(define purses null)
(define penalty-box null)

(define pop-questions null)
(define science-questions null)
(define sports-questions null)
(define rock-questions null)

(define current-player null)
(define is-getting-out-of-penalty-box? null)

(define output null)

(define (reset-all)
  (set! players empty)
  (set! places (make-vector 6))
  (set! purses (make-vector 6))
  (set! penalty-box (make-vector 6))

  (set! pop-questions (make-queue))
  (set! science-questions (make-queue))
  (set! sports-questions (make-queue))
  (set! rock-questions (make-queue))

  (set! current-player 0)
  (set! is-getting-out-of-penalty-box? #f)

  (for ([i (in-range 50)])
    (enqueue! pop-questions (~a "Pop Question " i))
    (enqueue! science-questions (~a "Science Question " i))
    (enqueue! sports-questions (~a "Sports Question " i))
    (enqueue! rock-questions (create-rock-question i)))

  (set! output null))

(define (create-rock-question i)
  (~a "Rock Question " i))

(reset-all)

(define (playable?)
  (>= how-many-players 2))

(define (print . args)
  (define s (apply ~a args))
  (set! output (cons s output))
  #;(displayln s))

(define (add player-name)
  (vector-set! places (how-many-players) 0)
  (vector-set! purses (how-many-players) 0)
  (vector-set! penalty-box (how-many-players) #f)
  (set! players (append players (list player-name)))

  (print player-name " was added")
  (print "They are player number " (length players)))

(define (how-many-players)
  (length players))

(define (new-position position roll)
  (modulo (+ position roll) 12))

(define (move-player roll)
  (vector-set! places current-player
               (new-position
                (vector-ref places current-player)
                roll))

  (print (current-player-name)
         "'s new location is "
         (vector-ref places current-player)))

(define (in-penalty-box?)
  (vector-ref penalty-box current-player))
  

(define (roll roll)
  (print (current-player-name) " is the current player")
  (print "They have rolled a " roll)

  (when (in-penalty-box?)
    (define getting-out (odd? roll))
    (set! is-getting-out-of-penalty-box? getting-out)
    (print (current-player-name) " is "
           (if getting-out "" "not ")
           "getting out of the penalty box"))

  (when (or (not (in-penalty-box?))
            is-getting-out-of-penalty-box?)            
    (move-player roll)
    (print "The category is " (current-category))
    (ask-question)))

(define (ask-question)
  (cond [(equal? (current-category) "Pop")
         (print (dequeue! pop-questions))]
        [(equal? (current-category) "Science")
         (print (dequeue! science-questions))]
        [(equal? (current-category) "Sports")
         (print (dequeue! sports-questions))]
        [(equal? (current-category) "Rock")
         (print (dequeue! rock-questions))]))

(define (current-category)
  (cond [(= (vector-ref places current-player) 0) "Pop"]
        [(= (vector-ref places current-player) 4) "Pop"]
        [(= (vector-ref places current-player) 8) "Pop"]
        [(= (vector-ref places current-player) 1) "Science"]
        [(= (vector-ref places current-player) 5) "Science"]
        [(= (vector-ref places current-player) 9) "Science"]
        [(= (vector-ref places current-player) 2) "Sports"]
        [(= (vector-ref places current-player) 6) "Sports"]
        [(= (vector-ref places current-player) 10) "Sports"]
        [else "Rock"]))

(define (current-player-name)
  (list-ref players current-player))

(define (next-player)
  (set! current-player (modulo (+ current-player 1) (length players))))

(define (was-correctly-answered?)
  (define winner null)
  (if (in-penalty-box?)
      (cond [is-getting-out-of-penalty-box?
             (print "Answer was correct!!!!")
             (vector-set! purses current-player (+ 1 (vector-ref purses current-player)))
             (print (current-player-name) " now has "
                    (vector-ref purses current-player) " Gold Coins.")

             (set! winner (did-player-win?))
             (next-player)
             winner]
            [else (next-player)
                  #t])
      (begin
        (print "Answer was corrent!!!!")
        (vector-set! purses current-player (+ 1 (vector-ref purses current-player)))
        (print (current-player-name) " now has "
               (vector-ref purses current-player) " Gold Coins.")

        (set! winner (did-player-win?))
        (set! current-player (+ current-player 1))
        (when (= current-player (length players))
          (set! current-player 0))
        winner)))
        

(define (wrong-answer)
  (print "Question was incorrectly answered")
  (print  (current-player-name) " was sent to the penalty box")
  (vector-set! penalty-box current-player #t)

  (set! current-player (+ current-player 1))
  (when (= current-player (length players))
    (set! current-player 0))
  #t)

(define (did-player-win?)
  (not (= (vector-ref purses current-player) 6)))                 


; GAME LOOP

(define (play-game . players)
  (reset-all)

  (for ([p players])
    (add p))
  (define not-a-winner #f)

  (let G ()
    (roll (+ (random 6) 1))
    (set! not-a-winner
          (if (= (random 10) 7)
              (wrong-answer)
              (was-correctly-answered?)))

    (when not-a-winner
      (G)))
  
  (reverse output))


;(play-game "Chet" "Pat" "Sue")
