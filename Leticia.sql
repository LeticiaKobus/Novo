DROP DATABASE IF EXISTS novo;

CREATE DATABASE novo;
USE novo;

CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    UserImage LONGBLOB,
    Email VARCHAR(100) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    FullName VARCHAR(100),
    DateOfBirth DATE,
    Phone VARCHAR(20)
);

CREATE TABLE Products (
    ProductID INT AUTO_INCREMENT PRIMARY KEY,
    ProductName VARCHAR(100) NOT NULL,
    ProductType ENUM('Anel', 'Colar', 'Pulseira', 'Combo') NOT NULL,
    ProductImage LONGBLOB,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    Stock INT NOT NULL
);

CREATE TABLE UserCart (
    CartID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    ProductID INT,
    Quantity INT NOT NULL DEFAULT 1,
    AddedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

INSERT INTO Products (ProductName, ProductType, ProductImage, Description, Price, Stock)
VALUES 
('Golden Dragon Ring', 'Anel', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/a1.png'), 'Um anel de prata com um design de dragão dourado e gravuras intrincadas.', 120.00, 10),
('Yin Yang Rings', 'Anel', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/a2.png'), 'Um par de anéis com o símbolo Yin Yang em preto e branco.', 80.00, 15),
('Winged Crest Ring', 'Anel', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/a3.png'), 'Um anel de prata com um design de brasão e detalhes de asas.', 100.00, 5),
('Sun and Moon Ring', 'Anel', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/a4.png'), 'Um anel de prata com um design de sol e lua, representando o dia e a noite.', 90.00, 8),
('Forest Landscape Ring', 'Anel', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/a5.png'), 'Um anel com uma paisagem de floresta detalhada encapsulada em uma cúpula de resina.', 150.00, 4),
('Wooden Pattern Ring', 'Anel', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/a6.png'), 'Um anel com um padrão de madeira e uma pedra preciosa verde.', 110.00, 7),
('Black Stripe Ring', 'Anel', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/a7.png'), 'Um anel de prata elegante com uma faixa preta no meio.', 70.00, 20),
('Crystal Soul Combo', 'Combo', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/a8.png'), 'Um conjunto de sete anéis com designs únicos, cada um apresentando uma pedra preciosa de cor diferente e detalhes em metal intrincados. Inclui os seguintes anéis: "Anel Esmeralda", "Anel Safira", "Anel Topázio", "Anel Rubi", "Anel Ametista", "Anel Diamante" e "Anel Ônix".', 420.00, 7),
('Anime Pendant Necklace', 'Colar', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/c1.png'), 'Um colar com um pingente inspirado em personagens de anime, apresentando um design único e detalhes marcantes.', 75.00, 12),
('Vintage Opaline Pendant', 'Colar', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/c2.png'), 'Um colar com cordão trançado marrom e um pingente de pedra opalina branca amarrado.', 85.00, 12),
('Emerald Enchantment Necklace', 'Colar', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/c3.png'), 'Um colar com cordão trançado verde e sete contas verdes escuras e facetadas, com formato octogonal, espaçadas uniformemente ao longo do cordão, preso com fechos de metal dourado nas duas extremidades.', 85.00, 12),
('Crimson Legacy Necklace', 'Colar', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/c4.png'), 'Um colar com contas alternadas em vermelho e preto, enfiadas em um cordão ou fio fino e flexível, com um pingente dourado do time de futebol Flamengo.', 85.00, 12),
('Golden Dragon Pendant', 'Colar', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/c5.png'), 'Um colar dourado com um pingente que apresenta um emblema com as letras "SCI" entrelaçadas no centro, cercadas pelo texto "C. INTERNACIONAL 1902".', 85.00, 12),
('Crystal Soul Combo', 'Combo', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/c6.png'), 'Um conjunto de cinco colares elegantes, cada um com um pingente de cristal ou pedra preciosa. Inclui os seguintes colares: "Opaline Whispers Necklace", "Celestial Blue Gemstone", "Obsidian Essence", "Moonstone Radiance" e "Emerald Enchantment".', 225.00, 10),
('Studded Choker Necklace', 'Colar', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/c7.png'), 'Um colar estilo choker preto com tachas prateadas e anéis de metal.', 85.00, 12),
('Classic Monochrome Beaded Necklace', 'Colar', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/c8.png'), 'Um colar elegante com um padrão de contas pretas e brancas, oferecendo um visual clássico e versátil. Ideal para complementar qualquer guarda-roupa.', 65.00, 20),
('Smiley Face Beaded Necklace', 'Colar', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/c9.png'), 'Um colar com contas em preto e branco, formando um loop contínuo. No centro do colar, há uma única conta amarela com um rosto sorridente. O fecho é prateado e o colar possui uma corrente ajustável para diferentes comprimentos. Um toque divertido e descontraído para qualquer visual!', 45.00, 15),
("Traveler's Memory Bracelet", 'Pulseira', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/p1.png'), 'Uma pulseira de prata com uma coleção de berloques que capturam a essência das aventuras ao redor do mundo. Cada berloque representa um marco icônico ou um elemento da natureza.', 95.00, 12),
('Fashion Charm Bracelet', 'Pulseira', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/p2.png'), 'Uma pulseira elegante com uma combinação de berloques e detalhes em preto. Os berloques incluem uma pena de prata, estrelas com tachas prateadas e trançados com fios vermelhos.', 65.00, 15),
('Rasta Stripe Bracelet', 'Pulseira', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/p3.png'), 'Uma pulseira com faixas horizontais nas cores vermelho, amarelo, verde e preto. O cordão preto é ajustável e possui duas pequenas contas nas extremidades, além de uma etiqueta de metal.', 45.00, 20),
('Metallic Bead Bracelet', 'Pulseira', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/p4.png'), 'Uma pulseira composta por contas esféricas com aparência metálica. As contas parecem ter um tamanho uniforme e provavelmente estão enfileiradas em um material elástico, permitindo que a pulseira se estique e se ajuste ao pulso.', 55.00, 18),
('Inspirational Bracelet', 'Pulseira', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/p5.png'), 'Uma pulseira com uma faixa preta e um fecho metálico. O destaque central é uma placa metálica com as palavras inscritas "FÉ + FORÇA + CORAGEM". Essa inscrição é inspiradora e frequentemente usada como motivação pessoal ou como presente para inspirar outras pessoas.', 75.00, 10),
('Leather Charm Bracelet', 'Pulseira', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/p6.png'), 'Uma pulseira de couro trançado marrom com dois pingentes metálicos. O pingente à esquerda parece ter um motivo estilizado de árvore ou planta, enquanto o pingente à direita apresenta caracteres Kanji.', 70.00, 15),
('Naruto-Inspired Wristband', 'Pulseira', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/p7.png'), 'Uma pulseira preta e branca com vários logotipos e texto relacionados à série de anime "Naruto". Há um símbolo nestas pulseiras representando a Vila da Folha Oculta da série.', 30.00, 25),
('Elegant Pearl Chain Bracelet', 'Pulseira', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/p8.png'), 'Uma pulseira dourada com design de elos de corrente, intercalados com o que parecem ser pérolas brancas. Anexado à pulseira, há um pingente em forma de coração com uma inscrição. A inscrição no pingente inclui as palavras "forever in my heart" (para sempre em meu coração).', 55.00, 20),
('Combo Bracelet Set', 'Combo', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/p9.png'), 'Um conjunto de quatro pulseiras artesanais feitas de fios ou cordões trançados, apresentando diferentes cores como verde, marrom, roxo e turquesa. Essas pulseiras são conhecidas como "pulseiras da amizade" e são frequentemente trocadas entre amigos.', 60.00, 30);