import pygame
import random

# Inisialisasi pygame
pygame.init()

# Warna
white = (255, 255, 255)
blue = (0, 0, 255)
green = (0, 255, 0)
red = (255, 0, 0)
black = (0, 0, 0)

# Ukuran layar
width = 800
height = 600
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption('Cat Mario-like Game')

# FPS
clock = pygame.time.Clock()
FPS = 60

# Karakter
cat_width = 50
cat_height = 50
cat_x = width // 2
cat_y = height - cat_height
cat_y_change = 0
is_jumping = False
jump_count = 10

# Platform
platforms = []
platform_width = 100
platform_height = 20
for i in range(5):
    platforms.append(pygame.Rect(random.randint(0, width - platform_width), random.randint(50, height - 50), platform_width, platform_height))

# Game Loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    keys = pygame.key.get_pressed()
    
    # Gerakan
    if keys[pygame.K_LEFT]:
        cat_x -= 5
    if keys[pygame.K_RIGHT]:
        cat_x += 5

    # Melompat
    if not is_jumping:
        if keys[pygame.K_SPACE]:
            is_jumping = True
    else:
        if jump_count >= -10:
            neg = 1
            if jump_count < 0:
                neg = -1
            cat_y -= (jump_count ** 2) * 0.5 * neg
            jump_count -= 1
        else:
            is_jumping = False
            jump_count = 10

    # Mengatur batas layar
    if cat_x < 0:
        cat_x = 0
    elif cat_x > width - cat_width:
        cat_x = width - cat_width

    # Menggambar
    screen.fill(white)
    pygame.draw.rect(screen, red, (cat_x, cat_y, cat_width, cat_height))
    
    for platform in platforms:
        pygame.draw.rect(screen, blue, platform)
        
    pygame.display.update()
    clock.tick(FPS)

pygame.quit()