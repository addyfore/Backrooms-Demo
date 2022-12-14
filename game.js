//IMPORTANT: Make sure to use Kaboom version 0.5.0 for this game by adding the correct script tag in the HTML file.

//Based on tutorial: https://www.youtube.com/watch?v=XX93O4ZVUZI 

kaboom({
  global: true,
  fullscreen: true,
  scale: 1,
  debug: true,
  clearColor: [0,0,0],
})

// Speeds
const MOVE_SPEED = 100
const SLICER_SPEED = 100
const SKELETOR_SPEED = 40

// Game Logic
loadRoot('zimages/')
loadSprite('link-going-left', 'left.png')
loadSprite('link-going-right', 'right.png')
loadSprite('link-going-down', 'forward.png')
loadSprite('link-going-up', 'top.png')
loadSprite('left-wall', 'leftwall.png')
loadSprite('top-wall', 'topwall.png')
loadSprite('bottom-wall', 'bottomwall.png')
loadSprite('right-wall', 'rightwall.png')
loadSprite('bottom-left-wall', 'bottomleft.png')
loadSprite('bottom-right-wall', 'bottomright.png')
loadSprite('top-left-wall', 'topleft.png')
loadSprite('top-right-wall', 'topright.png')
loadSprite('top-left-corner', 'topleftcorner.png')
loadSprite('top-right-corner', 'toprightcorner.png')
loadSprite('bottom-right-corner', 'bottomrightcorner.png')
loadSprite('top-door', 'topdoor.png')
loadSprite('door-floor', 'doorfloor.png')
loadSprite('bottom-door', 'bottomdoor.png')
loadSprite('empty', 'empty.png')
loadSprite('wall-cap', 'wallcap.png')
loadSprite('right-cap', 'rightcap.png')
loadSprite('fire-pot', 'planter.png')
loadSprite('left-door', 'leftdoor.png')
loadSprite('lanterns', 'candles.png')
loadSprite('slicer', 'bomb.png')
loadSprite('skeletor', 'ogre.png')
loadSprite('kaboom', 'boom.png')
loadSprite('stairs', 'stairs.png')
loadSprite('bg', 'floor.png')
loadSprite('key', 'key.png')
loadSprite('note', 'note.png')
loadSprite('mid-wall', 'midwall.png')
loadSprite('mid-right', 'midright.png')
loadSprite('mid-left', 'midleft.png')
loadSprite('mid-bottom', 'midbottom.png')
loadSprite('mid-corner', 'midcorner.png')
loadSprite('mid-left-corner', 'midleftcorner.png')
loadSprite('mid-right-corner', 'midrightcorner.png')

scene('menu', () => {
  add([text("The Backrooms.\n\n Press N for \ninstructions", 32), origin('center'), pos(width() / 2, height() / 2)])
  keyPress('n',()=>{
    go('instructions', (0));
  })
})

scene('instructions', () => {
  add([text("You have clipped through reality \n\nand must find 5 notes in order to escape!\n\nBe careful, there are \n\nghosts that will try to\n\nprevent you from escaping!\n\nUse arrow keys to move. \n\nPress N to \n\ngo to the next page.", 32), origin('center'), pos(width() / 2, height() / 2 + 50)])
  keyPress('n',()=>{
    go('instructions2', (0));
  })
})

scene('instructions2', () => {
  add([text("Once all notes are collected,\n\nan exit will appear!\n\nGood Luck!\n\nPress N to \n\nbegin the game.", 32), origin('center'), pos(width() / 2, height() / 2 + 50)])
  keyPress('n',()=>{
    go('game', (0));
  })
})

// Begin game scene
scene('game', ({noteCount}) => {
  layers(['bg', 'obj', 'ui'], 'obj')

  const maps = [
    [
      'ycccbacbaccccccbacccccccccccccb',
      'a   ba ba     *ba             b',
      'a   ba ba   }  ba 1  }   eddf b',
      'xf eza bxddf edzxd3 edf e3ccc b',
      'yc ccc cbacc ccbacc ccc c2    b',
      'a       ba     ba        2 ef b',
      'xdddf edza edf ba eddf 1 2 cc b',
      'acccc cc2c 2cc cc 2cc2 2 2    b',
      'a       c  2      2  c 2 4f edz',
      'a   1      2 edddd3 }  2 cc ccb',
      'a } 2   }  2 ccccc2* 1 2      b',
      'a   2  }   2 }    4dd3 c ef}  b',
      'xddd6dddddd3   }  2cc2   bxdddz',
      'accccccccccc  }   c  4df bacccb',
      'a                    ccc cc } b',
      'xddddf edddddddddddf          b',
      'accccc 2ccccccccccc2 eddddddddz',
      'a  }   2         * 2 2ccccccccb',
      'a edddd3   eddf edd3 2    }   b',
      'a 2cccc4df 2ccc ccc2 c eddddf b',
      'a 2  } 2cc 2       2   2cccc2 b',
      'a}2 ef c   4ddddddd3 1 2    2 b',
      'a 2 ba   } cccccccc2 2 2  } 2 b',
      'a 2 ba 1           2 2 2 }  c b',
      'a c ba 2 edddddddf 2 4d3      b',
      'a   ba 2 cccccccc2 2 2c2*   1 b',
      'xdddza 2         2 2 2 4dddd3 b',
      'accccc 2  } 1  } c c 2 cccccc b',
      'a*     2    2        2        b',
      'xdddddd6dddd6dddddddd6ddddddddz',
    ]
  ]

  const levelCfg = {
    width: 48,
    height: 48,
    a: [sprite('left-wall'), solid(), 'wall'],
    b: [sprite('right-wall'), solid(), 'wall'],
    c: [sprite('top-wall'), solid(), 'wall'],
    d: [sprite('bottom-wall'), solid(), 'wall'],
    e: [sprite('top-left-corner'), solid(), 'wall'],
    f: [sprite('top-right-corner'), solid(), 'wall'],
    g: [sprite('bottom-right-corner'), solid(), 'wall'],
    w: [sprite('top-right-wall'), solid(), 'wall'],
    x: [sprite('bottom-left-wall'), solid(), 'wall'],
    y: [sprite('top-left-wall'), solid(), 'wall'],
    z: [sprite('bottom-right-wall'), solid(), 'wall'],
    0: [sprite('empty'), solid(), 'wall'],
    1: [sprite('wall-cap'), solid(), 'wall'],
    2: [sprite('mid-wall'), solid(), 'wall'],
    3: [sprite('mid-right'), solid(), 'wall'],
    4: [sprite('mid-left'), solid(), 'wall'],
    5: [sprite('mid-bottom'), solid(), 'wall'],
    6: [sprite('mid-corner'), solid(), 'wall'],
    7: [sprite('mid-left-corner'), solid(), 'wall'],
    8: [sprite('mid-right-corner'), solid(), 'wall'],
    '%': [sprite('left-door'), solid(), 'door'],
    '^': [sprite('top-door'), solid(), 'wall'],
    'v': [sprite('bottom-door'), solid(), 'wall'],
    '_': [sprite('door-floor'), 'next-level'],
     $: [sprite('stairs'),'next-level'],
    '*': [sprite('note'), 'note'],
    '}': [sprite('skeletor'), 'dangerous', 'skeletor', { dir: -1, timer: 0 }],
    ')': [sprite('lanterns'), solid()],
    '(': [sprite('fire-pot'), solid()],
  }

  var noteCount = 0
  
  addLevel(maps[0], levelCfg)

  add([sprite('bg'), layer('bg'), scale(2), pos(48,0)])

  const player = add([
    sprite('link-going-right'),
    pos(96, 75),
    {
      // right by default
      dir: vec2(1, 0),
    },
  ])

  action(() => {
    // center camera to player
    camPos(player.pos)
	})


  player.action(() => {
    player.resolve()
  })

  keyDown('left', () => {
    player.changeSprite('link-going-left')
    player.move(-MOVE_SPEED, 0)
    player.dir = vec2(-1, 0)
  })

  keyDown('right', () => {
    player.changeSprite('link-going-right')
    player.move(MOVE_SPEED, 0)
    player.dir = vec2(1, 0)
  })

  keyDown('up', () => {
    player.changeSprite('link-going-up')
    player.move(0, -MOVE_SPEED)
    player.dir = vec2(0, -1)
  })

  keyDown('down', () => {
    player.changeSprite('link-going-down')
    player.move(0, MOVE_SPEED)
    player.dir = vec2(0, 1)
  })

  function spawnKaboom(p) {
    const obj = add([sprite('kaboom'), pos(p), 'kaboom'])
    wait(1, () => {
      destroy(obj)
    })
  }

  keyPress('space', () => {
    spawnKaboom(player.pos.add(player.dir.scale(48)))
  })

  player.collides('note', (n) => {
    destroy(n)
    noteCount++
  })

  action('slicer', (s) => {
    s.move(s.dir * SLICER_SPEED, 0)
  })

  collides('slicer', 'wall', (s) => {
    s.dir = -s.dir
  })

  action('skeletor', (s) => {
    s.move(0, s.dir * SKELETOR_SPEED)
    s.timer -= dt()
    if (s.timer <= 0) {
      s.dir = -s.dir
      s.timer = rand(5)
    }
  })

  collides('skeletor', 'wall', (s) => {
    s.dir = -s.dir
  })

  player.overlaps('dangerous', () => {
    go('lose', { noteCount: noteCount })
  })

  action('note', () => {
      if(noteCount == 5) {
        add([sprite('stairs'), pos(width() / 2, height() / 2 + 250),'escape'])
      }
  })

  player.overlaps('escape', () => {
    go('win')
  })
})

scene('win', () => {
  add([text("You Win!\nPress N for \nnew game.", 32), origin('center'), pos(width() / 2, height() / 2)])
  keyPress('n',()=>{
    window.location.reload();
  })
})

scene('lose', () => {
  add([text("Game Over\nPress N for\nnew game.", 32), origin('center'), pos(width() / 2, height() / 2)])
  keyPress('n',()=>{
    window.location.reload();
  })
})

start('menu', { level: 0, noteCount: 0 })
